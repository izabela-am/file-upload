import { createServer } from 'http';
import { appendFileSync, readFileSync } from 'fs';
import { join } from 'path';

const server = createServer();

const htmlPath = join(__dirname, '..', 'client', 'index.html');

server.on('listening', () => console.log('Listening.'));
server.on('request', (request, response) => {
  if(request.url === '/') {
    response.end(readFileSync(htmlPath));
    return;
  }

  if(request.url === '/upload') {
    const fileName = request.headers['file-name'];
    request.on('data', (chunk) => {
      appendFileSync(fileName as string, chunk);
      console.log(`Chunk size: ${chunk.length}`);
    });

    response.end('File was uploaded successfully.');
  }
});

server.listen(3333);
