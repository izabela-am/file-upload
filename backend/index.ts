import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join } from 'path';

const server = createServer();

const htmlPath = join(__dirname, '..', 'client', 'index.html')

server.on('listening', () => console.log('Listening.'));
server.on('request', (request, response) => {
  if(request.url === '/') {
    response.end(readFileSync(htmlPath));
    return;
  }
});

server.listen(3333);
