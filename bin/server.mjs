import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const host = process.env.HOSTNAME || '0.0.0.0';
const port = Number(process.env.APP_PORT || process.env.PORT || 3000);
const root = '/app/dist';

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function resolvePath(url) {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  const normalized = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const requested = join(root, normalized);

  if (existsSync(requested) && statSync(requested).isFile()) return requested;
  if (existsSync(join(requested, 'index.html'))) return join(requested, 'index.html');
  return join(root, 'index.html');
}

const server = createServer((request, response) => {
  const file = resolvePath(request.url || '/');
  const type = types[extname(file)] || 'application/octet-stream';

  response.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': file.includes('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
  });

  createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`static server listening on ${host}:${port}`);
});
