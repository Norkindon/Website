
window.addEventListener('load', function() {
    setTimeout(function() {
        var portfolioScript = document.createElement('script');
        portfolioScript.src = '../js/portfolio.js';
        document.body.appendChild(portfolioScript);
    }, 10); 
});