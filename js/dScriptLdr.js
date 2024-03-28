
window.addEventListener('load', function() {
    setTimeout(function() {
        var portfolioScript = document.createElement('script');
        portfolioScript.src = './js/portfolio.js';
        document.body.appendChild(portfolioScript);
    }, 10); 
});



// dScriptLdr.js

const scriptUrls = [
    './js/preloader.js',
    './js/main.js',
    './js/csvloader.js',
    './js/Welcome.js',
    "https://unpkg.com/gsap@3.9.0/dist/gsap.min.js",
    "https://code.jquery.com/jquery-3.6.4.min.js",
    "https://cdn.jsdelivr.net/npm/grained@0.0.2/grained.min.js",
  
 
    // Add other script URLs here as needed
  ];
  
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  async function loadScripts() {
    try {
      const promises = scriptUrls.map(url => loadScript(url));
      await Promise.all(promises);
      console.log('All scripts loaded successfully.');
    } catch (error) {
      console.error('Error loading scripts:', error);
    }
  }
  
  loadScripts();
  


  