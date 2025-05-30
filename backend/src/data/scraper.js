// // scraper.js

// const axios = require('axios');
// const fs    = require('fs');

// // polite 1s delay per robots.txt crawl‑delay
// const sleep = ms => new Promise(r => setTimeout(r, ms));

// // RemoteOK's JSON API endpoint
// const API_URL = 'https://remoteok.io/api';

// // format ISO date to `D MMMM YYYY`
// function formatDate(isoString) {
//   if (!isoString) return 'Not specified';
//   const d     = new Date(isoString);
//   const day   = d.getUTCDate();
//   const month = d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
//   const year  = d.getUTCFullYear();
//   return `${day} ${month} ${year}`;
// }

// /**
//  * Fetches up to MAX_JOBS from RemoteOK, normalizes each field,
//  * writes out jobs.json if writeFile is true, and returns the array.
//  */
// const scrapeJobs = async ({ maxJobs = 6000, writeFile = true } = {}) => {
//   try {
//     console.log('⏳ Fetching jobs from RemoteOK API…');
//     const { data } = await axios.get(API_URL, {
//       headers: { 'User-Agent': 'Mozilla/5.0' }
//     });

//     if (!Array.isArray(data)) throw new Error('Unexpected API response');

//     // drop metadata at index 0
//     const allJobs = data.slice(1);

//     // cap to maxJobs
//     const rawJobs = allJobs.slice(0, maxJobs);

//     // normalize and fill missing with "Not specified"
//     const jobs = rawJobs.map((job, i) => {
//       const tags = Array.isArray(job.tags) ? job.tags : [];
//       const pick = re => tags.find(t => re.test(t)) || 'Not specified';

//       // Determine work mode based on location and tags
//       let workMode = 'Not specified';
//       if (tags.some(t => /Remote|Work from home|WFH/i.test(t))) {
//         workMode = 'remote';
//       } else if (tags.some(t => /On[- ]?site|Office|On[- ]?premise/i.test(t))) {
//         workMode = 'on-site';
//       } else if (tags.some(t => /Hybrid|Flexible|Part[- ]?remote/i.test(t))) {
//         workMode = 'hybrid';
//       } else if (job.location?.toLowerCase().includes('remote')) {
//         workMode = 'remote';
//       }

//       return {
//         id:               String(i + 1),
//         title:            job.position        || 'Not specified',
//         company:          job.company         || 'Not specified',
//         location:         job.location        || 'Not specified',
//         jobType:          pick(/Full[- ]?Time|Part[- ]?Time|Contract|Internship|Freelance/i),
//         experienceLevel:  pick(/Senior|Mid|Junior/i),
//         workMode:         workMode,
//         postedDate:       job.date && /^\d{1,2} [A-Za-z]+ \d{4}$/.test(job.date)
//                              ? job.date
//                              : formatDate(job.date),
//         applicationLink:  job.apply_url || job.url || 'Not specified'
//       };
//     });

//     // respect crawl‑delay
//     await sleep(1000);

//     if (writeFile) {
//       fs.writeFileSync(`${__dirname}/jobs.json`, JSON.stringify(jobs, null, 2), 'utf-8');
//       console.log(`✅ Scraped ${jobs.length} jobs. Saved to jobs.json`);
//     } else {
//       console.log(`✅ Scraped ${jobs.length} jobs.`);
//     }

//     return jobs;
//   } catch (err) {
//     console.error('❌ Error scraping jobs:', err.message);
//     return [];
//   }
// };

// // If you run this file directly, call it now:
// if (require.main === module) {
//   scrapeJobs();
// }

// // Export for use in your server or elsewhere
// module.exports = scrapeJobs;
// combinedScraper.js

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

    const allJobs = [...remoteOkJobs, ...linkedInJobs];
    fs.writeFileSync(`${__dirname}/jobs.json`, JSON.stringify(allJobs, null, 2), 'utf-8');
    console.log(`✅ Scraped ${allJobs.length} total jobs from RemoteOK and LinkedIn.`);
  } catch (err) {
    console.error('❌ Error scraping jobs:', err.message);
  }
};

if (require.main === module) {
  scrapeJobs();
}

module.exports = scrapeJobs;
