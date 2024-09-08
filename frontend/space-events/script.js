document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/space-events')
        .then(response => response.json())
        .then(events => {
            const eventCards = document.getElementById('event-cards');

            if (events && events.length) {
                eventCards.innerHTML = events.map((event, index) => `
                    <div class="event-card" id="event-card-${index}">
                        <h2>${event.name}</h2>
                        <p class="event-date"><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                        <div class="event-description hidden">
                            <p><strong>Description:</strong> ${event.description}</p>
                            <p><strong>Type:</strong> ${event.type}</p>
                            <p id="countdown-${index}" class="countdown"><strong>Countdown:</strong> Loading...</p>
                        </div>
                    </div>
                `).join('');

                // Add event listeners for the card expansion and countdown
                document.querySelectorAll('.event-card').forEach((card, index) => {
                    const event = events[index];
                    const countdownElement = document.getElementById(`countdown-${index}`);
                    
                    // Add click listener for expanding cards
                    card.addEventListener('click', () => {
                        // Deselect all cards first
                        document.querySelectorAll('.event-card').forEach(c => {
                            c.classList.remove('expanded');
                            c.querySelector('.event-description').classList.add('hidden');
                        });

                        // Expand the clicked card
                        card.classList.add('expanded');
                        const description = card.querySelector('.event-description');
                        description.classList.remove('hidden');

                        // Start countdown for the clicked card
                        startCountdown(event.date, countdownElement);
                    });
                });
            } else {
                eventCards.innerHTML = '<p>No upcoming space events available for Redmond, WA.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching space events:', error);
            document.getElementById('event-cards').innerHTML = '<p>Failed to load space events.</p>';
        });
});

// Function to start the countdown
function startCountdown(eventDate, countdownElement) {
    const targetDate = new Date(eventDate).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = "<strong>Countdown:</strong> Event has passed!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `<strong>Countdown:</strong> ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 300);
}
