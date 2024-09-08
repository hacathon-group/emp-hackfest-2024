document.addEventListener('DOMContentLoaded', () => {
    const locationStatus = document.getElementById('location-status');
    const starGazingContainer = document.getElementById('star-gazing-spots');

    // Check if geolocation is available
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                // Fetch star-gazing spots from the backend
                fetch(`http://localhost:3000/star-gazing-spots?lat=${latitude}&lng=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        locationStatus.textContent = 'Here are some great star-gazing spots near you:';
                        starGazingContainer.innerHTML = ''; // Clear the loading message

                        data.spots.forEach(spot => {
                            const spotCard = document.createElement('div');
                            spotCard.classList.add('card');
                            const spotTitle = document.createElement('h2');
                            spotTitle.textContent = spot.name;

                            const spotDetails = document.createElement('p');
                            spotDetails.textContent = `Distance: ${spot.distance} mi | Location: ${spot.location}`;

                            const mapsLink = document.createElement('a');
                            mapsLink.href = `https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`;
                            mapsLink.target = '_blank';
                            mapsLink.textContent = 'View on Google Maps';

                            spotCard.appendChild(spotTitle);
                            spotCard.appendChild(spotDetails);
                            spotCard.appendChild(mapsLink);
                            starGazingContainer.appendChild(spotCard);
                        });
                    })
                    .catch(error => {
                        locationStatus.textContent = 'Failed to fetch star-gazing spots.';
                        console.error('Error fetching star-gazing spots:', error);
                    });
            },
            error => {
                locationStatus.textContent = 'Unable to retrieve your location.';
                console.error('Error retrieving location:', error);
            }
        );
    } else {
        locationStatus.textContent = 'Geolocation is not supported by your browser.';
    }
});
