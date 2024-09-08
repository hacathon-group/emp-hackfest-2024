const axios = require("axios"); // For making HTTP requests
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function (fastify, opts) {
    // Define route to fetch rocket launches from The Space Devs API
    fastify.get("/rocket-launches", async (req, res) => {
        try {
            const response = await axios.get("https://lldev.thespacedevs.com/2.2.0/launch/upcoming", {
                headers: {
                    // If there's an API key required for the request, uncomment the line below
                    // 'Authorization': `Bearer ${process.env.SPACEDEVS_API_KEY}`
                }
            });
            const launches = response.data.results.map(launch => ({
                name: launch.name,
                net: launch.net, // Launch date
                pad: {
                    name: launch.pad.name,
                    location: {
                        name: launch.pad.location.name,
                        latitude: launch.pad.location.latitude,
                        longitude: launch.pad.location.longitude,
                    }
                },
                crew: launch.crew || [], // Array of crew members if available
                rocket: {
                    name: launch.rocket.configuration.name,
                    family: launch.rocket.configuration.family,
                },
                mission: {
                    description: launch.mission?.description || "No mission details available.",
                    type: launch.mission?.type || "Unknown",
                },
                links: {
                    webcast: launch.webcast || null, // Link to live streams or videos
                }
            }));

            res.send({ results: launches });
        } catch (error) {
            console.error(error);
            res.code(500).send({ error: 'Failed to fetch rocket launches' });
        }
    });
};