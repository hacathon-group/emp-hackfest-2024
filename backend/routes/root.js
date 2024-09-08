const axios = require("axios"); // For making HTTP requests
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function (fastify, opts) {
    // Define route to fetch rocket launches from The Space Devs API
    fastify.get("/rocket-launches", async (req, res) => {
        try {
            const response = await axios.get("https://lldev.thespacedevs.com/2.2.0/launch/upcoming", {
                // headers: {
                //     'Authorization': `Bearer ${process.env.SPACEDEVS_API_KEY}`
                // }
            });
            res.send(response.data);
        } catch (error) {
            res.code(500).send({ error: 'Failed to fetch rocket launches' });
        }
    });

    fastify.get("/", async (req, res) => {
        res.send({ hello: "world" });
    });
};
0