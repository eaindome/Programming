const { createShortUrl } = require('../urlService');

const shortenUrl = async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).send({
            message: 'Missing Url.'
        });
    }

    try {
        const urlData = await createShortUrl(longUrl);
        return res.status(201).send({
            shortUrl: `${req.protocol}://${req.get('host')}/${urlData.shortUrl}`
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: 'Failed to shorten URL'
        });
    }
};

module.exports = {
    shortenUrl
};