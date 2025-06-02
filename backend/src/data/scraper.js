

// const axios = require('axios');
// const fs = require('fs');
// const https = require('https');

// const sleep = ms => new Promise(r => setTimeout(r, ms));
// const REMOTEOK_API_URL = 'https://remoteok.io/api';
// const LINKEDIN_API_URL = 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-7d?limit=50&offset=0&title_filter=%22Software%20Engineer%22&location_filter=%22United%20States%22';

// const HEADERS = {
//   'x-rapidapi-key': '804534cefemsh7289f3debdb6497p169c42jsn71de7e0663db',
//   'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com',
//   'User-Agent': 'Mozilla/5.0'
// };

// function formatDate(isoString) {
//   if (!isoString) return 'Not specified';
//   const d = new Date(isoString);
//   const day = d.getUTCDate();
//   const month = d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
//   const year = d.getUTCFullYear();
//   return `${day} ${month} ${year}`;
// }

// const normalizeRemoteOkJobs = (jobs, startId = 1) => {
//   return jobs.map((job, i) => {
//     const tags = Array.isArray(job.tags) ? job.tags : [];
//     const pick = re => tags.find(t => re.test(t)) || 'Not specified';

//     let workMode = 'Not specified';
//     if (tags.some(t => /Remote|Work from home|WFH/i.test(t))) {
//       workMode = 'remote';
//     } else if (tags.some(t => /On[- ]?site|Office|On[- ]?premise/i.test(t))) {
//       workMode = 'on-site';
//     } else if (tags.some(t => /Hybrid|Flexible|Part[- ]?remote/i.test(t))) {
//       workMode = 'hybrid';
//     } else if (job.location?.toLowerCase().includes('remote')) {
//       workMode = 'remote';
//     }

//     return {
//       id: String(startId + i),
//       title: job.position || 'Not specified',
//       company: job.company || 'Not specified',
//       location: job.location || 'Not specified',
//       jobType: pick(/Full[- ]?Time|Part[- ]?Time|Contract|Internship|Freelance/i),
//       experienceLevel: pick(/Senior|Mid|Junior/i),
//       workMode,
//       postedDate: job.date && /^\d{1,2} [A-Za-z]+ \d{4}$/.test(job.date) ? job.date : formatDate(job.date),
//       applicationLink: job.apply_url || job.url || 'Not specified'
//     };
//   });
// };

// const normalizeLinkedInJobs = (jobs, startId = 1) => {
//   return jobs.map((job, i) => ({
//     id: String(startId + i),
//     title: job.title || 'Not specified',
//     company: job.organization || 'Not specified',
//     location: job.locations_derived?.[0] || 'Not specified',
//     jobType: job.employment_type?.[0] || 'Not specified',
//     experienceLevel: 'Not specified',
//     workMode: job.remote_derived ? 'remote' : 'Not specified',
//     postedDate: formatDate(job.date_posted),
//     applicationLink: job.url || 'Not specified'
//   }));
// };

// const scrapeJobs = async () => {
//   try {
//     console.log('⏳ Fetching RemoteOK jobs…');
//     const remoteOkRes = await axios.get(REMOTEOK_API_URL, {
//       headers: { 'User-Agent': 'Mozilla/5.0' }
//     });
//     const remoteOkJobsRaw = remoteOkRes.data.slice(1);
//     const remoteOkJobs = normalizeRemoteOkJobs(remoteOkJobsRaw);

//     await sleep(1000);

//     console.log('⏳ Fetching LinkedIn jobs…');
//     const linkedInRes = await axios.get(LINKEDIN_API_URL, { headers: HEADERS });
//     const linkedInJobs = normalizeLinkedInJobs(linkedInRes.data, remoteOkJobs.length + 1);

//     const allJobs = [...remoteOkJobs, ...linkedInJobs];
//     fs.writeFileSync(`${__dirname}/jobs.json`, JSON.stringify(allJobs, null, 2), 'utf-8');
//     console.log(`✅ Scraped ${allJobs.length} total jobs from RemoteOK and LinkedIn.`);
//   } catch (err) {
//     console.error('❌ Error scraping jobs:', err.message);
//   }
// };

// if (require.main === module) {
//   scrapeJobs();
// }

// module.exports = scrapeJobs;

const axios = require('axios');
const fs = require('fs');
const https = require('https');

const sleep = ms => new Promise(r => setTimeout(r, ms));
const REMOTEOK_API_URL = 'https://remoteok.io/api';
const LINKEDIN_API_URL = 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-7d?limit=50&offset=0&title_filter=%22Software%20Engineer%22&location_filter=%22United%20States%22';

const HEADERS = {
  'x-rapidapi-key': '804534cefemsh7289f3debdb6497p169c42jsn71de7e0663db',
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
      title: job.position || 'Not specified',
      company: job.company || 'Not specified',
      location: job.location || 'Not specified',
      jobType: pick(/Full[- ]?Time|Part[- ]?Time|Contract|Internship|Freelance/i),
      experienceLevel: pick(/Senior|Mid|Junior/i),
      workMode,
      postedDate: job.date && /^\d{1,2} [A-Za-z]+ \d{4}$/.test(job.date) ? job.date : formatDate(job.date),
      applicationLink: job.apply_url || job.url || 'Not specified'
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
    applicationLink: job.url || 'Not specified'
  }));
};

// Normalize Indeed jobs for consistency and continuation of job IDs
const normalizeIndeedJobs = (jobs, startId = 1) => {
  return jobs.map((job, i) => ({
    id: String(startId + i),
    title: job.title || 'Not specified',
    company: job.companyName || 'Not specified',
    location: job.location?.city && job.location?.country 
      ? `${job.location.city}, ${job.location.country}` 
      : 'Not specified',
    jobType: Array.isArray(job.jobType) && job.jobType.length > 0 ? job.jobType[0] : 'Not specified',
    experienceLevel: 'Not specified', // Not provided by API
    workMode: 'Not specified', // Not provided by API
    postedDate: job.age || 'Not specified',
    applicationLink: job.jobUrl || 'Not specified'
  }));
};

const scrapeIndeedJobs = () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      hostname: 'indeed-scraper-api.p.rapidapi.com',
      path: '/api/job',
      headers: {
        'x-rapidapi-key': '804534cefemsh7289f3debdb6497p169c42jsn71de7e0663db',
        'x-rapidapi-host': 'indeed-scraper-api.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    };

    const postData = JSON.stringify({
      scraper: {
        maxRows: 15,
        query: 'Developer',
        location: 'San Francisco',
        jobType: 'fulltime',
        radius: '50',
        sort: 'relevance',
        fromDays: '7',
        country: 'us',
      },
    });

    const req = https.request(options, (res) => {
      let chunks = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

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

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
};

const scrapeJobs = async () => {
  try {
    console.log('⏳ Fetching RemoteOK jobs…');
    const remoteOkRes = await axios.get(REMOTEOK_API_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const remoteOkJobsRaw = remoteOkRes.data.slice(1);
    const remoteOkJobs = normalizeRemoteOkJobs(remoteOkJobsRaw);

    await sleep(1000);

    console.log('⏳ Fetching LinkedIn jobs…');
    const linkedInRes = await axios.get(LINKEDIN_API_URL, { headers: HEADERS });
    const linkedInJobs = normalizeLinkedInJobs(linkedInRes.data, remoteOkJobs.length + 1);

    await sleep(1000);

    console.log('⏳ Fetching Indeed jobs…');
    const indeedJobsRaw = await scrapeIndeedJobs();
    const indeedJobs = normalizeIndeedJobs(indeedJobsRaw, remoteOkJobs.length + linkedInJobs.length + 1);

    const allJobs = [...remoteOkJobs, ...linkedInJobs, ...indeedJobs];
    fs.writeFileSync(`${__dirname}/jobs.json`, JSON.stringify(allJobs, null, 2), 'utf-8');
    console.log(`✅ Scraped ${allJobs.length} total jobs from RemoteOK, LinkedIn, and Indeed.`);
  } catch (err) {
    console.error('❌ Error scraping jobs:', err.message);
  }
};

if (require.main === module) {
  scrapeJobs();
}

module.exports = scrapeJobs;
