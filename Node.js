const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.use(express.json());

app.post('/fetchCarrierInfo', async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        const response = await axios.get(`https://freecarrierlookup.com/`);
        const $ = cheerio.load(response.data);

        // Simulate entering the number into the form and submitting it
        // Note: This might not work due to bot protection on the target site

        // Example of extracting data from the page
        const carrier = $('strong.text-success').text();
        res.json({ success: true, carrier: carrier });
    } catch (error) {
        console.error('Error fetching carrier info:', error);
        res.json({ success: false, message: 'Error fetching carrier info.' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
