const fs = require('fs');
const path = require('path');
const DBLaptopsFile = path.join(__dirname, 'DBLaptops', 'laptops.json');
 
 function getAllLaptops (req, res) {
  fs.readFile(DBLaptopsFile, 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500);
      res.end(JSON.stringify('server error'));
      return;
    }
    res.end(data);
  })
 }

 function getOneLaptop (req, res) {
  fs.readFile(DBLaptopsFile, 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500);
      res.end(JSON.stringify('server error'));
      return;
    }
    const laptops = JSON.parse(data);
    const id = req.params.id;
    const laptop = laptops.find(laptop => laptop.id === parseInt(id, 10));
    if (!laptop) {
      res.writeHead(404);
      res.end(JSON.stringify('No Laptop Found'));
    }
    res.end(JSON.stringify(laptop));
  
  });
  }

 function addLaptop (req, res) {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const newLaptop = JSON.parse(parsedBody);

    fs.readFile(DBLaptopsFile, 'utf8', (error, data) => {
      if (error) {
        res.writeHead(500);
        res.end(JSON.stringify('Server Error'));
        return;
      }
      const oldlaptops =JSON.parse(data);
      const allLaptops = [...oldlaptops, newLaptop];
      const lastLaptop = oldlaptops[oldlaptops.length - 1];
      const lastLaptopId = lastLaptop.id;
            newLaptop.id = lastLaptopId + 1;

      fs.writeFile(DBLaptopsFile, JSON.stringify(allLaptops), (error) => {
        if (error) {
          res.writeHead(500);
          res.end(JSON.stringify('Server Error'));
          return;
        }
        res.writeHead(200);
        res.end(JSON.stringify('Laptop Updated Successfully'));
      });
    });
  });
 }

 function updateLaptop (req, res) {
   const body = [];

   req.on('data', (chunk) => {
    body.push(chunk);
   });
   req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const laptopToUpdate = JSON.parse(parsedBody);

    fs.readFile(DBLaptopsFile, 'utf8', (error, data) => {
      if (error) {
        res.writeHead(500);
        res.end(JSON.stringify('Server Error'));
        return;
      }
      const allLaptops = JSON.parse(data);
      laptopsIndex = allLaptops.findIndex(laptop => laptop.id === laptopToUpdate.id);
      if (laptopsIndex === -1) {
        res.writeHead(404);
        res.end(JSON.stringify('No Laptop with the specified ID found'));
        return;
      }
      allLaptops[laptopsIndex] = {...allLaptops[laptopsIndex], ...laptopToUpdate};

      fs.writeFile(DBLaptopsFile, JSON.stringify(allLaptops), (error) => {
        if (error) {
          res.writeHead(500);
          res.end(JSON.stringify('Server Error'));
          return;
        }
        res.end(JSON.stringify('Laptop Updated Successfully'));
      });
    });
   });
 }


function deleteLaptop (req, res) {
  const body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  })
  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const laptopToDelete = JSON.parse(parsedBody);

    fs.readFile(DBLaptopsFile, 'utf8', (error, data) => {
      if (error) {
        res.writeHead(500);
        res.end(JSON.stringify('Server Error'));
        return;
      }
      const allLaptops = JSON.parse(data);
      const laptopsIndex = allLaptops.findIndex(laptop => laptop.id === laptopToDelete.id);
      if (laptopsIndex === - 1) {
        res.writeHead(404);
        res.end(JSON.stringify('No Laptop with the specified ID Found'));
        return;
      }
      allLaptops.splice(laptopsIndex, 1);

      fs.writeFile(DBLaptopsFile, JSON.stringify(allLaptops), (error) => {
        if (error) {
          res.writeHead(500);
          res.end(JSON.stringify('Server Error'));
          return;
        }
        res.end(JSON.stringify('Laptop Deletion Successful'));
      });
    });
  });
}










 module.exports = {
     getAllLaptops,
     getOneLaptop,
    addLaptop,
    updateLaptop,
    deleteLaptop
 }