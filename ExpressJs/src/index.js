const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));


const groceryList = [
    {
      item: 'milk',
      quantity: 2,  
    },
    {
        item: 'cereal',
        quantity: 1,
    }
];


// GET method
app.get('/groceries', (request, response) => {
    response.send(groceryList);
});

// POST method
app.post('/groceries', (request, response) => {
    console.log(request.body);
    groceryList.push(request.body);
    response.send(201);
});