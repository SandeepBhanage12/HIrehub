// scraper.js

const axios = require('axios');
const fs    = require('fs');

// polite 1s delay per robots.txt crawl‑delay
const sleep = ms => new Promise(r => setTimeout(r, ms));

// RemoteOK’s JSON API endpoint
const API_URL = 'https://remoteok.io/api';

// format ISO date to `D MMMM YYYY`
function formatDate(isoString) {
  if (!isoString) return 'Not specified';
  const d     = new Date(isoString);
  const day   = d.getUTCDate();
  const month = d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
  const year  = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Fetches up to MAX_JOBS from RemoteOK, normalizes each field,
 * writes out jobs.json if writeFile is true, and returns the array.
 */
const scrapeJobs = async ({ maxJobs = 6000, writeFile = true } = {}) => {
  try {
    console.log('⏳ Fetching jobs from RemoteOK API…');
    const { data } = await axios.get(API_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!Array.isArray(data)) throw new Error('Unexpected API response');

    // drop metadata at index 0
    const allJobs = data.slice(1);

    // cap to maxJobs
    const rawJobs = allJobs.slice(0, maxJobs);

    // normalize and fill missing with "Not specified"
    const jobs = rawJobs.map((job, i) => {
      const tags = Array.isArray(job.tags) ? job.tags : [];
      const pick = re => tags.find(t => re.test(t)) || 'Not specified';

      return {
        id:               String(i + 1),
        title:            job.position        || 'Not specified',
        company:          job.company         || 'Not specified',
        location:         job.location        || 'Not specified',
        jobType:          pick(/Full[- ]?Time|Part[- ]?Time|Contract|Internship|Freelance/i),
        experienceLevel:  pick(/Senior|Mid|Junior/i),
        workMode:         pick(/Remote|On[- ]?site|Hybrid/i),
        postedDate:       job.date && /^\d{1,2} [A-Za-z]+ \d{4}$/.test(job.date)
                             ? job.date
                             : formatDate(job.date),
        applicationLink:  job.apply_url || job.url || 'Not specified'
      };
    });

    // respect crawl‑delay
    await sleep(1000);

    if (writeFile) {
      fs.writeFileSync(`${__dirname}/jobs.json`, JSON.stringify(jobs, null, 2), 'utf-8');
      console.log(`✅ Scraped ${jobs.length} jobs. Saved to jobs.json`);
    } else {
      console.log(`✅ Scraped ${jobs.length} jobs.`);
    }

    return jobs;
  } catch (err) {
    console.error('❌ Error scraping jobs:', err.message);
    return [];
  }
};

// If you run this file directly, call it now:
if (require.main === module) {
  scrapeJobs();
}

// Export for use in your server or elsewhere
module.exports = scrapeJobs;
