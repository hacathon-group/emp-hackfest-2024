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

                modalTitle.textContent = launch.name;
                modalDetails.textContent = `Date: ${new Date(launch.net).toLocaleDateString()} | Site: ${launch.pad.location.name}`;
                
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

            // Back to Home Button
            document.getElementById('back-home').addEventListener('click', () => {
                window.location.href = 'index.html'; // Adjust if your home page URL is different
            });
        })
        .catch(error => {
            console.error('Error fetching rocket launches:', error);
        });
});
