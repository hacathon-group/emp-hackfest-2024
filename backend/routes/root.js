const axios = require("axios"); // For making HTTP requests
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function (fastify, opts) {
    fastify.get("/", async (req, res) => {
        res.send({ hello: "world" });
    });
};
