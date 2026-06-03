const https = require('https');
const http = require('http');

const PORT = 8081;
const TICKET = '54F4EE58-3902-43B5-BDB9-72854C25B4C0';

// Servidor backend intermedio para eliminar CORS e inyectar datos fidedignos ilimitados
const server = http.createServer((req, res) => {
  // Cabeceras CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, ticket');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url.startsWith('/v2/compra-agil')) {
    // Reenviar la petición a api2 de ChileCompra de forma 100% segura y con las cabeceras requeridas
    const options = {
      hostname: 'api2.mercadopublico.cl',
      path: req.url,
      method: 'GET',
      headers: {
        'ticket': TICKET,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', (chunk) => { data += chunk; });
      apiRes.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json && json.payload && json.payload.items && json.payload.items.length > 0) {
            console.log("[Proxy Debug] Primer item recibido de ChileCompra:", JSON.stringify(json.payload.items[0], null, 2));
          }
        } catch (e) {}
        res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    });

    apiReq.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });

    apiReq.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(PORT, () => {
  console.log(`[Mercado Público Proxy] Levantado y escuchando peticiones oficiales de ChileCompra en http://localhost:${PORT}`);
});
