const { Router } = require('express');

const router = Router();


router.post('/', (request, response) => {
    const { username, password } = request.body;
    if (username && password) {
        if (request.session.user) {
            response.send(response.session.user);
        } else {
            request.session.user = {
                username,
            };
            response.send(request.session);
        }
    } else response.send(401); 
});

module.exports = router;