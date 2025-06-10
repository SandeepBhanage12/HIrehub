
const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const https = require('https');

const sleep = ms => new Promise(r => setTimeout(r, ms));

const LINKEDIN_API_URL = 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-7d?limit=150&offset=0&title_filter=%22Software%20Engineer%22&location_filter=%22India%22';

const HEADERS = {
  'x-rapidapi-key': '04ed09ac76mshe5204add37db450p12891ejsn73b4acd25960',
  'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com',
  'User-Agent': 'Mozilla/5.0'
};

function formatDate(isoString) {
  if (!isoString) return 'Not specified';
  const d = new Date(isoString);
  const day = d.getUTCDate();
  const month = d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

// Scrape RemoteOK using Puppeteer
const scrapeRemoteOKWithPuppeteer = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://remoteok.io/remote-dev-jobs', {
    waitUntil: 'networkidle2'
  });

  await page.waitForSelector('table#jobsboard');

  const jobs = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr.job'));

    return rows.map((row) => {
      const title = row.querySelector('h2')?.innerText || 'Not specified';
      const company = row.querySelector('.companyLink span')?.innerText || 'Not specified';
      const location = row.querySelector('.location')?.innerText || 'Not specified';
      const tags = Array.from(row.querySelectorAll('.tag')).map(tag => tag.innerText);
      const link = row.getAttribute('data-href')
        ? `https://remoteok.io${row.getAttribute('data-href')}`
        : 'Not specified';

      return { title, company, location, tags, link, date: new Date().toISOString() };
    });
  });

  await browser.close();
  return jobs;
};

const normalizeRemoteOkJobs = (jobs, startId = 1) => {
  return jobs.map((job, i) => {
    const tags = Array.isArray(job.tags) ? job.tags : [];
    const pick = re => tags.find(t => re.test(t)) || 'Not specified';

    let workMode = 'Not specified';
    if (tags.some(t => /Remote|Work from home|WFH/i.test(t))) {
      workMode = 'remote';
    } else if (tags.some(t => /On[- ]?site|Office|On[- ]?premise/i.test(t))) {
      workMode = 'on-site';
    } else if (tags.some(t => /Hybrid|Flexible|Part[- ]?remote/i.test(t))) {
      workMode = 'hybrid';
    } else if (job.location?.toLowerCase().includes('remote')) {
      workMode = 'remote';
    }

    return {
      id: String(startId + i),
      title: job.title || 'Not specified',
      company: job.company || 'Not specified',
      location: job.location || 'Not specified',
      jobType: pick(/Full[- ]?Time|Part[- ]?Time|Contract|Internship|Freelance/i),
      experienceLevel: pick(/Senior|Mid|Junior/i),
      workMode,
      postedDate: formatDate(job.date),
      applicationLink: job.link || 'Not specified',
      source: 'RemoteOK'
    };
  });
};

const normalizeLinkedInJobs = (jobs, startId = 1) => {
  return jobs.map((job, i) => ({
    id: String(startId + i),
    title: job.title || 'Not specified',
    company: job.organization || 'Not specified',
    location: job.locations_derived?.[0] || 'Not specified',
    jobType: job.employment_type?.[0] || 'Not specified',
    experienceLevel: 'Not specified',
    workMode: job.remote_derived ? 'remote' : 'Not specified',
    postedDate: formatDate(job.date_posted),
    applicationLink: job.url || 'Not specified',
    source: 'LinkedIn'
  }));
};

const normalizeIndeedJobs = (jobs, startId = 1) => {
  return jobs.map((job, i) => ({
    id: String(startId + i),
    title: job.title || 'Not specified',
    company: job.companyName || 'Not specified',
    location: job.location?.formattedAddressLong || job.location?.formattedAddressShort || 'Not specified',
    jobType: Array.isArray(job.jobType) && job.jobType.length > 0 ? job.jobType[0] : 'Not specified',
    experienceLevel: 'Not specified',
    workMode: 'Not specified',
    postedDate: job.age || 'Not specified',
    applicationLink: job.jobUrl || 'Not specified',
    source: 'Indeed'
  }));
};

const scrapeIndeedJobs = () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      hostname: 'indeed-scraper-api.p.rapidapi.com',
      path: '/api/job',
      headers: {
        'x-rapidapi-key': '04ed09ac76mshe5204add37db450p12891ejsn73b4acd25960',
        'x-rapidapi-host': 'indeed-scraper-api.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    };

    const postData = JSON.stringify({
      scraper: {
        maxRows: 100,
        query: 'Developer',
        location: 'Bangalore',
        jobType: 'fulltime',
        radius: '100',
        sort: 'relevance',
        fromDays: '7',
        country: 'in',
      }
    });

    const req = https.request(options, (res) => {
      let chunks = [];

      res.on('data', (chunk) => chunks.push(chunk));

      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        try {
          const json = JSON.parse(body);
          if (json.returnvalue && Array.isArray(json.returnvalue.data)) {
            resolve(json.returnvalue.data);
          } else {
            resolve([]);
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
};

const scrapeJobs = async () => {
  try {
    console.log('⏳ Scraping RemoteOK jobs via Puppeteer...');
    const remoteOkRaw = await scrapeRemoteOKWithPuppeteer();
    const remoteOkJobs = normalizeRemoteOkJobs(remoteOkRaw);

    await sleep(1000);

    console.log('⏳ Fetching LinkedIn jobs via API...');
    const linkedInRes = await axios.get(LINKEDIN_API_URL, { headers: HEADERS });
    const linkedInJobs = normalizeLinkedInJobs(linkedInRes.data, remoteOkJobs.length + 1);

    await sleep(1000);

    console.log('⏳ Fetching Indeed jobs via API...');
    const indeedRaw = await scrapeIndeedJobs();
    const indeedJobs = normalizeIndeedJobs(indeedRaw, remoteOkJobs.length + linkedInJobs.length + 1);

    const allJobs = [...remoteOkJobs, ...linkedInJobs, ...indeedJobs];
    
    fs.writeFileSync(`${__dirname}/jobs.json`, JSON.stringify(allJobs, null, 2), 'utf-8');
    console.log(`✅ Scraped and saved ${allJobs.length} jobs successfully.`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
};

if (require.main === module) {
  scrapeJobs();
}

module.exports = scrapeJobs;
