const http = require('http');
const HOSTNAME = 'localhost';
const PORT = 5000;
const { getAllLaptops, getOneLaptop, addLaptop, updateLaptop, deleteLaptop } = require('./routers');

const server = http.createServer(requestHandler);

function requestHandler (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const urlParts = req.url.split('/');
  
  

  if (req.url === '/laptops' && req.method === 'GET') {
    getAllLaptops(req, res);
  } else if (urlParts[1] === 'laptops' && urlParts[2] && req.method === 'GET') {
    req.params = { id: parseInt(urlParts[2], 10) };
    getOneLaptop(req, res);
  }  else if (req.url === '/laptop/post' && req.method === 'POST') {
    addLaptop(req, res);
  } else if (req.url === '/laptop/update' && req.method === 'PUT') {
    updateLaptop(req, res);
  } else if (req.url === '/laptop/delete' && req.method === 'DELETE') {
    deleteLaptop(req, res);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify("No such URL Found"));
  }
}




server.listen(PORT, HOSTNAME, () => {
  console.log(`Server Started Successfully at http://${HOSTNAME}:${PORT}`);
  
});