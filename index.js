const http = require('http');
const HOSTNAME = 'localhost';
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
   
   if (req.url === '/index.html') {
    res.writeHead(200);
    res.write('<h1 style="color: blue">This is Student Portal</h1>');
    res.end('<p style="font-size: 30px">I am a Student at AltSchoolAfrica. <br> I am studying Backend Engineering-NODEJS</p>');
   } else {
    res.writeHead(404);
    res.end(JSON.stringify({message: "404 NOT FOUND"}));
   }
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
  
})