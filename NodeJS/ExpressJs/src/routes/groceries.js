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
    response.cookie('visited', true, {      // adding a cookie
        maxAge: 10000,
    });
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
    console.log(request.cookies);
    const { item } = request.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    response.send(groceryItem);
});

router.post('/shopping/cart/item', (request, response) => {
    const { item, quantity } = request.body;
    const cartItem = { item, quantity };
    // console.log(cartItem);
    // response.send(request.sessionID);
    const { cart } = request.session;
    if (request.session.cart) {
        const { items } = cart;
        request.session.cart.items.push(cartItem);
    } else {
        request.session.cart = {
            items: [cartItem]
        };
    }
    response.send(201);
});

router.get('/shopping/cart', (request, response) => {
    const { cart } = request.session;
    if (!cart) {
        response.send('You have no cart session');;
    } else {
        response.send(cart);
    }
});



module.exports = router;