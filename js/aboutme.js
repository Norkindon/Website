window.onload = function() {
    var textContainer = document.getElementById('text-container');

    fetch('./assets/text/aboutme.txt')
        .then(response => response.text())
        .then(data => {
            textContainer.textContent = data; // Set the text content of the container
            // textContainer.classList.add('reztext'); // Add the class to apply styles
        })
        .catch(error => {
            console.error('Error fetching text file:', error);
        });
};