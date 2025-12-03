const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 读取 setting.json 文件
    const settingPath = path.join(process.cwd(), 'setting.json');
    const settingData = fs.readFileSync(settingPath, 'utf8');
    const setting = JSON.parse(settingData);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(setting);
  } catch (error) {
    console.error('Error reading setting.json:', error);
    res.status(500).json({ error: 'Failed to load settings' });
  }
};

