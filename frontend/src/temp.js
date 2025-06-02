const https = require('https');

const options = {
  method: 'POST',
  hostname: 'indeed-scraper-api.p.rapidapi.com',
  path: '/api/job',
  headers: {
    'x-rapidapi-key': '804534cefemsh7289f3debdb6497p169c42jsn71de7e0663db', // your key
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

      // Check if data exists and is an array
      if (json.returnvalue && Array.isArray(json.returnvalue.data)) {
        const jobs = json.returnvalue.data;

        jobs.forEach((job, index) => {
          console.log(`Job #${index + 1}`);
          console.log(`Title: ${job.title || 'N/A'}`);
          console.log(`Company: ${job.companyName || 'N/A'}`);
          console.log(`Location: ${job.location.city || 'N/A'}, ${job.location.country || 'N/A'}`);
          console.log(`Job Type: ${job.jobType[0] || 'N/A'}`);
          console.log(`Job URL: ${job.jobUrl || 'N/A'}`);
          console.log(`Date Posted: ${job.age || 'N/A'}`);
          
        });
      } else {
        console.log('No job data found in response.');
      }
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      console.log('Raw response:', body);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(postData);
req.end();
