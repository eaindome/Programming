const { Router } = require('express');

const router = Router();


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
router.get('/', (request, response) => {
    response.send(groceryList);
});

// POST method
router.post('/', (request, response) => {
    console.log(request.body);
    groceryList.push(request.body);
    response.send(201);
});

// testing middleware
router.get('/deliveries', 
    (request, response, next) => {
        console.log('Before Handling Request');
        next();
    }, 
    (request, response, next) => {
        response.send(groceryList);
        next();
    },
    (request, response) => {
        console.log('Finished Executing Get Request')
    }
);

// adding route parameters
router.get('/:item', (request, response) => {
    //console.log(request.params.item);
    const { item } = request.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    response.send(groceryItem);
});

module.exports = router;