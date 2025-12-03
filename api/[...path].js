const https = require('https');
const http = require('http');
const { URL } = require('url');

module.exports = async (req, res) => {
  // 立即记录请求，确保函数被调用
  console.log('=== API Proxy Function Called ===');
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  console.log('Request Query:', JSON.stringify(req.query));
  console.log('Request Headers:', JSON.stringify(req.headers));
  
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, lang, clientId, tenantId');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }

  const targetBase = 'https://wintermute-app.dradish.xyz/api/';
  
  // 在 Vercel 中，使用 [...path].js 时，路径会被解析为 req.query.path
  // 通过 rewrite 规则，路径会作为查询参数传递：/api/[...path]?path=app/globalizations
  let actualPath = '';
  
  // 方法1: 从查询参数获取（通过 rewrite 规则传递）
  if (req.query.path) {
    actualPath = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path;
  }
  
  // 方法2: 从 req.url 解析（如果没有查询参数）
  if (!actualPath && req.url) {
    // 从 /api/app/globalizations 或 /api/[...path]?path=app/globalizations 中提取
    const urlMatch = req.url.match(/^\/api\/(.+?)(\?|$)/);
    if (urlMatch && !urlMatch[1].includes('?')) {
      actualPath = urlMatch[1];
    } else if (req.url.includes('path=')) {
      // 如果 URL 包含 path= 参数，提取它
      const pathMatch = req.url.match(/[?&]path=([^&]+)/);
      if (pathMatch) {
        actualPath = decodeURIComponent(pathMatch[1]);
      }
    }
  }
  
  // 方法3: 从路径参数获取（Vercel 的动态路由）
  if (!actualPath && req.query && Object.keys(req.query).length > 0) {
    // 检查是否有其他路径参数
    const pathKeys = Object.keys(req.query).filter(k => k !== 'path');
    if (pathKeys.length > 0) {
      actualPath = pathKeys.map(k => req.query[k]).join('/');
    }
  }
  
  // 构建目标 URL
  const targetUrl = new URL(actualPath || '', targetBase);
  
  // 保留原始查询参数（排除 path 参数，因为它是路由参数）
  if (req.url.includes('?')) {
    const queryString = req.url.substring(req.url.indexOf('?'));
    const originalParams = new URLSearchParams(queryString);
    originalParams.forEach((value, key) => {
      // 跳过 path 参数，因为它是路由参数，不是 API 参数
      if (key !== 'path') {
        targetUrl.searchParams.set(key, value);
      }
    });
  }

  console.log('Proxying request:', {
    originalUrl: req.url,
    url: req.url,
    query: req.query,
    actualPath,
    targetUrl: targetUrl.toString(),
    method: req.method
  });

  // 准备请求选项
  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || 443,
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers: {
      ...req.headers,
      host: targetUrl.hostname,
    }
  };

  // 转发特定的请求头
  if (req.headers.authorization) {
    options.headers['Authorization'] = req.headers.authorization;
  }
  if (req.headers.lang) {
    options.headers['lang'] = req.headers.lang;
  }
  if (req.headers.clientid) {
    options.headers['clientId'] = req.headers.clientid;
  }
  if (req.headers.tenantid) {
    options.headers['tenantId'] = req.headers.tenantid;
  }

  // 删除可能引起问题的头
  delete options.headers['host'];
  delete options.headers['connection'];

  // 发送请求
  const client = targetUrl.protocol === 'https:' ? https : http;
  
  const proxyReq = client.request(options, (proxyRes) => {
    // 设置响应头
    res.statusCode = proxyRes.statusCode;
    Object.keys(proxyRes.headers).forEach(key => {
      res.setHeader(key, proxyRes.headers[key]);
    });
    
    // 转发响应体
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  });

  // 转发请求体（如果有）
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
}

