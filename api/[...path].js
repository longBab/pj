const https = require('https');
const http = require('http');
const { URL } = require('url');

module.exports = async (req, res) => {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, lang, clientId, tenantId');

  // Immediately handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }
  
  console.log('=== API Proxy Function Called ===');
  console.log('Request URL:', req.url);
  console.log('Request Query:', JSON.stringify(req.query));

  const targetBase = 'https://wintermute-app.dradish.xyz/api/';

  // In Vercel, the dynamic part of the route '[...path]' is available in req.query.path.
  // This is the most reliable way to get the intended API path.
  const actualPath = req.query.path ? (Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path) : '';

  // Construct the base target URL with the actual path.
  const targetUrl = new URL(actualPath, targetBase);

  // Append all query parameters from the original request, except for the 'path'
  // parameter, which is used for routing and is not part of the target API query.
  for (const key in req.query) {
    if (key !== 'path') {
      const value = req.query[key];
      if (Array.isArray(value)) {
        // Handle cases where a parameter is present multiple times, e.g., ?a=1&a=2
        value.forEach(v => targetUrl.searchParams.append(key, v));
      } else {
        targetUrl.searchParams.append(key, value);
      }
    }
  }

  console.log(`Proxying request from ${req.url} to ${targetUrl.toString()}`);

  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port,
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers: req.headers, // Forward original headers
  };
  
  // The 'host' header must be rewritten to match the target host for name-based virtual hosting.
  options.headers['host'] = targetUrl.hostname;

  const proxyRequest = (targetUrl.protocol === 'https:' ? https : http).request(options, (proxyResponse) => {
    // Forward the status code and headers from the target's response to the client.
    res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    // Pipe the response body from the target to the client.
    proxyResponse.pipe(res);
  });

  proxyRequest.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.status(502).json({ error: 'Bad Gateway', message: 'The proxy server received an invalid response from the upstream server.' });
  });

  // Pipe the client's request body to the target server (for POST, PUT, etc.).
  req.pipe(proxyRequest);
};

