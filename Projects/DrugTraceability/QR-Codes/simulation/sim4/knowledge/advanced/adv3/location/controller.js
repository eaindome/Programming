const axios = require('axios');

const getLocation = async (req, res) => {
    try {
        // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ip = '41.218.221.198';      //'8.8.8.8'; // Use a public IP address for testing
        const response = await axios.get(`https://ipinfo.io/${ip}/json`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error getting location', error });
    }
};

module.exports = {
    getLocation,
};
