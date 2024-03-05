document.addEventListener("DOMContentLoaded", function() {
    var preloader = document.getElementById('preloader');
    var progressBar = document.getElementById('progress-bar');
    var progressPercent = document.getElementById('progress-percent');

    // Simulate a minimum duration of 5 seconds for the preloader
    setTimeout(function() {
        preloader.style.opacity = '0'; // Fade out the preloader
        setTimeout(function() {
            preloader.style.display = 'none'; // Hide the preloader after fading out
        }, 500); // Adjust the duration to match your fade-out transition
    }, 5000); // 5000 milliseconds = 5 seconds

    // Update progress bar based on page loading progress
    var updateProgressBar = function() {
        var progress = (window.pageYOffset / (document.body.offsetHeight - window.innerHeight)) * 100;
        progressBar.style.width = progress + '%';
        progressPercent.innerText = Math.round(progress) + '%';
    };

    // Call updateProgressBar when the page is scrolled or resized
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);

    // Call updateProgressBar once initially
    updateProgressBar();
});
