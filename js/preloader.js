window.addEventListener("load", function() {
    var preloader = document.getElementById('preloader');
    var progressBar = document.getElementById('progress-bar');
    var progressPercent = document.getElementById('progress-percent');

    setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    var updateProgressBar = function() {
        var progress = (window.pageYOffset / (document.body.offsetHeight - window.innerHeight)) * 100;
        progressBar.style.width = progress + '%';
        progressPercent.innerText = Math.round(progress) + '%';
    };

    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);

    updateProgressBar();
});
