const axios = require("axios");

module.exports = async function (fastify, opts) {
    // Route to fetch star-gazing spots near user location
    fastify.get("/star-gazing-spots", async (req, res) => {
        const { lat, lng } = req.query;
        
        // Convert latitude and longitude to numbers
        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);

        console.log(`User location: ${userLat}, ${userLng}`);
        // Sample data; replace with actual API data
        const starGazingSpots = [
            { "name": "Rattlesnake Ledge", "latitude": 47.4349, "longitude": -121.7857, "location": "Cedar Falls, WA"},
            { "name": "Cougar Mountain", "latitude": 47.5341, "longitude": -122.1009, "location": "Issaquah, WA"},
            { "name": "Tiger Mountain", "latitude": 47.4857, "longitude": -121.9672, "location": "Issaquah, WA"},
            { "name": "Alki Beach", "latitude": 47.5764, "longitude": -122.4066, "location": "Seattle, WA"},
            { "name": "Snoqualmie Point Park", "latitude": 47.5277, "longitude": -121.8276, "location": "Snoqualmie, WA"},
            { "name": "Gold Creek Pond", "latitude": 47.4219, "longitude": -121.4216, "location": "Snoqualmie Pass, WA"},
            { "name": "Marymoor Park", "latitude": 47.6609, "longitude": -122.1215, "location": "Redmond, WA"},
            { "name": "Paramount Park", "latitude": 47.7281, "longitude": -122.2966, "location": "Shoreline, WA"},
            { "name": "Green Lake", "latitude": 47.6784, "longitude": -122.3419, "location": "Seattle, WA"},
            { "name": "Discovery Park", "latitude": 47.6594, "longitude": -122.4051, "location": "Seattle, WA"},
            { "name": "Lake Sammamish State Park", "latitude": 47.5606, "longitude": -122.0652, "location": "Issaquah, WA"},
            { "name": "Ebey's Landing", "latitude": 48.2077, "longitude": -122.6888, "location": "Coupeville, WA"},
            { "name": "Snoqualmie Falls", "latitude": 47.5411, "longitude": -121.8371, "location": "Snoqualmie, WA"},
            { "name": "Bridle Trails State Park", "latitude": 47.6459, "longitude": -122.1865, "location": "Kirkland, WA"},
            { "name": "O.O. Denny Park", "latitude": 47.7196, "longitude": -122.2555, "location": "Kirkland, WA"},
            { "name": "Hansville Greenway", "latitude": 47.9145, "longitude": -122.5561, "location": "Hansville, WA"},
            { "name": "Lake Wenatchee State Park", "latitude": 47.8118, "longitude": -120.7189, "location": "Leavenworth, WA"},
            { "name": "Tiger Mountain State Forest", "latitude": 47.4857, "longitude": -121.9672, "location": "Issaquah, WA"},
            { "name": "Rimrock Lake", "latitude": 46.6705, "longitude": -121.3129, "location": "Yakima, WA"},
            { "name": "Keechelus Lake", "latitude": 47.3676, "longitude": -121.3856, "location": "Snoqualmie Pass, WA"},
            { "name": "Cherry Creek Falls", "latitude": 47.7312, "longitude": -121.9982, "location": "Duvall, WA"},
            { "name": "Spencer Island Park", "latitude": 48.0144, "longitude": -122.1832, "location": "Everett, WA"},
            { "name": "Twin Falls State Park", "latitude": 47.4584, "longitude": -121.7576, "location": "North Bend, WA"},
            { "name": "Washington Pass Overlook", "latitude": 48.5111, "longitude": -120.6665, "location": "North Cascades, WA"},
            { "name": "Edmonds Waterfront", "latitude": 47.8107, "longitude": -122.3774, "location": "Edmonds, WA"},
            { "name": "Lynndale Park", "latitude": 47.8218, "longitude": -122.3047, "location": "Lynnwood, WA"},
            { "name": "Sunset Hill Park", "latitude": 47.6837, "longitude": -122.4045, "location": "Seattle, WA"},
            { "name": "Carnation Marsh Natural Area", "latitude": 47.6483, "longitude": -121.9145, "location": "Carnation, WA"},
            { "name": "McDonald Park", "latitude": 47.8203, "longitude": -122.0915, "location": "Snohomish, WA"},
            { "name": "Fir Island Farms Reserve", "latitude": 48.3205, "longitude": -122.3786, "location": "Mount Vernon, WA"}
        ];

        // Function to calculate distance between two coordinates
        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 3958.8; // Radius of Earth in miles
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in miles
        }

        // Add distance to each spot
        const spotsWithDistance = starGazingSpots.map(spot => ({
            ...spot,
            distance: calculateDistance(userLat, userLng, spot.latitude, spot.longitude)
        }));

        // Send all spots, sorted by distance
        const sortedSpots = spotsWithDistance.sort((a, b) => a.distance - b.distance);
        console.log(`Found ${sortedSpots.length} star-gazing spots near user.`);

        res.send({ spots: sortedSpots });
    });
};
