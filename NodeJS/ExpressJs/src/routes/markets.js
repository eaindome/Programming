const { Router, response } = require('express');

const router = Router(); 

const supermarkets = [
    {
        id: 1,
        store: "Shoprite",
        location: "Accra"
    },
    {
        id: 2,
        store: 'Melcome',
        location: 'Tema'
    },
    {
        id: 3,
        store: 'Johnny Walker',
        location: 'Boston'
    },
    {
        id: 4,
        store: 'Lindador',
        location: 'Accra-Kumasi'
    },
    {
        id: 5,
        store: 'Golden Tulip',
        location: 'Kumasi'
    }
];

router.use((req, res, next) => {
    if (req.session.user) next();
    else {
        res.send(401);
    }
});

router.get('/', (request, response) => {
    response.send(supermarkets);
});

router.get('/location', (request, response) => {
    const { location } = request.query;
    if (location) {
        const filteredStores = supermarkets.filter((s) => s.location == location);
        response.send(filteredStores);
    } else response.send(supermarkets)
    response.send(supermarkets);
});

router.get('/id', (request, response) => {
    const { id } = request.query;
    const parsedId = parseInt(id);
    if (!isNaN(parsedId)){
        const filteredStores = supermarkets.filter((s) => s.id == parsedId);
        response.send(filteredStores);
    } else response.send(supermarkets);
});


module.exports = router;