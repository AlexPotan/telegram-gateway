const http = require('http');
const https = require('https');

const BOT_TOKEN = '8015187824:AAHE4xS-HSSZpI6b69jNC2Hpil4XkUtngOE';
const CHAT_ID = '717526456';
const SECRET = 'SECRET123';

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const key = url.searchParams.get('key');
  const text = url.searchParams.get('text');

  if (key !== SECRET) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  if (!text) {
    res.writeHead(400);
    return res.end('No text');
  }

  const telegramUrl =
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` +
    `?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`;

  https.get(telegramUrl, tgRes => {
    res.writeHead(200);
    res.end('OK');
  }).on('error', err => {
    res.writeHead(500);
    res.end('Telegram error');
  });

}).listen(process.env.PORT || 3000);
