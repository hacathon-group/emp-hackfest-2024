document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/rocket-launches')
        .then(response => response.json())
        .then(data => {
            const launchesContainer = document.getElementById('launches-container');
            const launches = data.results; // Assumes the API returns an array of launches under 'results'

            launches.forEach(launch => {
                const launchCard = document.createElement('div');
                launchCard.classList.add('card');
                launchCard.dataset.launch = JSON.stringify(launch);

                const launchTitle = document.createElement('h2');
                launchTitle.textContent = launch.name;

                const launchDetails = document.createElement('p');
                launchDetails.textContent = `Date: ${new Date(launch.net).toLocaleDateString()} | Site: ${launch.pad.location.name}`;

                launchCard.appendChild(launchTitle);
                launchCard.appendChild(launchDetails);
                launchesContainer.appendChild(launchCard);
            });

            // Add click event listener to each card
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', () => {
                    const launch = JSON.parse(card.dataset.launch);
                    showModal(launch);
                });
            });

            function showModal(launch) {
                const modal = document.getElementById('modal');
                const modalTitle = document.getElementById('modal-title');
                const modalDetails = document.getElementById('modal-details');
                const countdownTimer = document.getElementById('countdown-timer');
                const flightPath = document.getElementById('flight-path');
                const mapsLink = document.getElementById('maps-link');
                const crewList = document.getElementById('crew-list');

                modalTitle.textContent = launch.name;
                modalDetails.textContent = `Date: ${new Date(launch.net).toLocaleDateString()} | Site: ${launch.pad.location.name}`;

                // Google Maps Link for Launch Location
                const latitude = launch.pad.location.latitude;
                const longitude = launch.pad.location.longitude;
                mapsLink.href = `https://www.google.com/maps?q=${launch.pad.location.name}`;
                mapsLink.textContent = `View Launch Location: ${launch.pad.location.name}`;

                // Check if the launch is crewed and list crew members
                if (launch.crew.length > 0) {
                    crewList.innerHTML = ''; // Clear previous crew list
                    launch.crew.forEach(member => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${member.name} (${member.role})`;
                        crewList.appendChild(listItem);
                    });
                } else {
                    crewList.innerHTML = '<li>No crew for this launch.</li>';
                }

                // Countdown Timer
                const launchDate = new Date(launch.net).getTime();
                const interval = setInterval(() => {
                    const now = new Date().getTime();
                    const distance = launchDate - now;

                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

                    if (distance < 0) {
                        clearInterval(interval);
                        countdownTimer.textContent = 'EXPIRED';
                    }
                }, 1000);

                // Placeholder for flight path animation
                flightPath.innerHTML = `<p>Flight path animation here (placeholder for ${launch.name})</p>`;

                modal.style.display = 'block';
            }

            // Close modal
            document.getElementById('close').addEventListener('click', () => {
                document.getElementById('modal').style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target === document.getElementById('modal')) {
                    document.getElementById('modal').style.display = 'none';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching rocket launches:', error);
        });
});
