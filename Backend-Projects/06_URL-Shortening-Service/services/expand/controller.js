const { getLongUrl } = require('../urlService');

const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;

    if (!shortUrl) {
        return res.status(400).send({
            message: 'URL missing.'
        });
    }

    try {
        const longUrl = await getLongUrl(shortUrl);

        if (!longUrl) {
            return res.status(404).send({
                message: 'Long URL not found.'
            });
        }

        return res.status(200).redirect(longUrl);
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: 'Failed to redirect URL'
        });
    }
};

module.exports = {
    redirectUrl
}