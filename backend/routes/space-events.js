const fs = require('fs');
const path = require('path');

module.exports = async function (fastify, opts) {
    fastify.get('/space-events', async (req, res) => {
        try {
            const filePath = path.join(__dirname, '../data/events.json');  // Your JSON file path
            const data = fs.readFileSync(filePath, 'utf-8');
            const events = JSON.parse(data);
            
            // Sort events by date and filter upcoming ones
            const now = new Date();
            const upcomingEvents = events.filter(event => new Date(event.date) > now);  // Filter future events

            if (upcomingEvents.length > 0) {
                res.send(upcomingEvents);  // Send all upcoming events
            } else {
                res.send({ message: 'No upcoming space events for Redmond, WA.' });
            }
        } catch (error) {
            console.error('Error fetching space events:', error);
            res.status(500).send({ error: 'Failed to fetch space events' });
        }
    });
};
