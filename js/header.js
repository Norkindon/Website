function importCSS(filename) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.href = filename;
    link.rel = 'stylesheet';
    head.appendChild(link);
}





// Create header div




const headerDiv = document.createElement('div');
headerDiv.classList.add('header');

// Create headerR div
const headerRDiv = document.createElement('div');
headerRDiv.classList.add('headerR');

// Create headerL div
const headerLDiv = document.createElement('div');
headerLDiv.classList.add('headerL');

const logotext = document.createElement('div');
logotext.classList.add('logotext');



// Create h1 element
const h1Element = document.createElement('h1');
h1Element.textContent = 'NICK BIXLER';
h1Element.onclick = function() {
    if (window.location.href.indexOf('index.html') === -1) {
        window.location.href = '../index.html';
    }
};

h1Element.style.transition = 'color 0.3s ease'; // Apply transition to the created element
h1Element.style.transition = 'scale 0.3s ease'; // Apply transition to the created element


const logo = document.createElement('div');
logo.classList.add('logo');

// Append elements to header div
headerDiv.appendChild(logo);
headerDiv.appendChild(headerRDiv);
headerDiv.appendChild(headerLDiv);
headerDiv.appendChild(logotext);
headerDiv.appendChild(h1Element);



// Append header div to the body
document.body.appendChild(headerDiv);




//extra