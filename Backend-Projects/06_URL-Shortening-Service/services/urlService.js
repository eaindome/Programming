const Url = require('../models/urlModel');
const shortid = require('shortid');

const createShortUrl = async (longUrl) => {
    try {
        const shortUrl = shortid.generate();
        const newUrl = new Url({
            longUrl,
            shortUrl
        });

        await newUrl.save();
        return newUrl;
    } catch (err) {
        console.error(`Error: ${err}`);
        return '';
    }
};

const getLongUrl = async (shortUrl) => {
    const urlData = await Url.findOne({
        shortUrl
    });

    if (!urlData) {
        throw new Error('URL not found.')
    }

    return urlData.longUrl;
}

module.exports = {
    createShortUrl,
    getLongUrl
}