document.addEventListener('DOMContentLoaded', function () {
    // Set the date to January 2, 2024
    const countdownDate = new Date('January 2, 2024 00:00:00').getTime();
  
    // Update the countdown every 1 second
    const countdownInterval = setInterval(function () {
      const now = new Date().getTime();
      const distance = countdownDate - now;
  
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        // Update the individual elements
        document.getElementById('days').innerHTML = days;
        document.getElementById('hours').innerHTML = hours;
        document.getElementById('minutes').innerHTML = minutes;
        document.getElementById('seconds').innerHTML = seconds;
      } else {
        // Display a message when the countdown is over
        document.getElementById('countdown').innerHTML = 'Countdown expired';
        clearInterval(countdownInterval);
      }
    }, 1000);
  });
  