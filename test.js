// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://4arctg.atlassian.net/rest/api/3/issue/HIAD-1318', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      `brian.bolli@arctg.com:${process.env.GROOMSTER_ATLASSIAN_API_TOKEN}`
    ).toString('base64')}`,
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => fs.writeFileSync('HIAD-1318.json', text))
  .catch(err => console.error(err));
