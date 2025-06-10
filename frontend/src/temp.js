// const https = require('https');

// const options = {
//   method: 'POST',
//   hostname: 'indeed-scraper-api.p.rapidapi.com',
//   path: '/api/job',
//   headers: {
//     'x-rapidapi-key': '804534cefemsh7289f3debdb6497p169c42jsn71de7e0663db', // your key
//     'x-rapidapi-host': 'indeed-scraper-api.p.rapidapi.com',
//     'Content-Type': 'application/json',
//   },
// };

// const postData = JSON.stringify({
//   scraper: {
//     maxRows: 15,
//     query: 'Developer',
//     location: 'San Francisco',
//     jobType: 'fulltime',
//     radius: '50',
//     sort: 'relevance',
//     fromDays: '7',
//     country: 'us',
//   },
// });

// const req = https.request(options, (res) => {
//   let chunks = [];

//   res.on('data', (chunk) => {
//     chunks.push(chunk);
//   });

//   res.on('end', () => {
//     const body = Buffer.concat(chunks).toString();

//     try {
//       const json = JSON.parse(body);

//       // Check if data exists and is an array
//       if (json.returnvalue && Array.isArray(json.returnvalue.data)) {
//         const jobs = json.returnvalue.data;

//         jobs.forEach((job, index) => {
//           console.log(`Job #${index + 1}`);
//           console.log(`Title: ${job.title || 'N/A'}`);
//           console.log(`Company: ${job.companyName || 'N/A'}`);
//           console.log(`Location: ${job.location.city || 'N/A'}, ${job.location.country || 'N/A'}`);
//           console.log(`Job Type: ${job.jobType[0] || 'N/A'}`);
//           console.log(`Job URL: ${job.jobUrl || 'N/A'}`);
//           console.log(`Date Posted: ${job.age || 'N/A'}`);
          
//         });
//       } else {
//         console.log('No job data found in response.');
//       }
//     } catch (error) {
//       console.error('Failed to parse JSON:', error);
//       console.log('Raw response:', body);
//     }
//   });
// });

// req.on('error', (e) => {
//   console.error('Request error:', e);
// });

// req.write(postData);
// req.end();

const https = require('https');
const fs = require('fs');

const scrapeIndeedJobs = () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      hostname: 'indeed-scraper-api.p.rapidapi.com',
      path: '/api/job',
      headers: {
        'x-rapidapi-key': '04ed09ac76mshe5204add37db450p12891ejsn73b4acd25960', // Replace with your valid API key
        'x-rapidapi-host': 'indeed-scraper-api.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    };

    const postData = JSON.stringify({
      scraper: {
        maxRows: 100,
        query: 'Developer',
        location: '', // Fetch jobs from India
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

const fetchIndeedJobs = async () => {
  try {
    console.log('⏳ Fetching Indeed jobs via API...');
    const indeedRaw = await scrapeIndeedJobs();
    const indeedJobs = normalizeIndeedJobs(indeedRaw);
    
    fs.writeFileSync(`${__dirname}/indeed_jobs.json`, JSON.stringify(indeedJobs, null, 2), 'utf-8');
    console.log(`✅ Scraped and saved ${indeedJobs.length} Indeed jobs successfully.`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
};

if (require.main === module) {
  fetchIndeedJobs();
}

module.exports = fetchIndeedJobs;
