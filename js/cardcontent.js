// Function to fetch the CSV file
function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text())
        .then(text => {
            // Split the CSV text into rows while preserving commas within quotes
            const rows = text.split('\n').map(row => {
                let insideQuotes = false;
                let buffer = '';
                const result = [];
                
                // Iterate over each character in the row
                for (const char of row) {
                    if (char === '"') {
                        insideQuotes = !insideQuotes;
                    } else if (char === ',' && !insideQuotes) {
                        result.push(buffer);
                        buffer = '';
                    } else {
                        buffer += char;
                    }
                }

                // Push the remaining buffer to the result
                result.push(buffer);

                return result;
            });

            // Skip the first row (header)
            return rows.slice(1);
        });
}

// Function to create card elements and populate them with data
function createCards(data) {
    const cardsContainer = document.querySelector('.cards');

    data.forEach(row => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.onclick = function() {
            window.location.href = row[3]; // Set the link
        };

        const cardFaceDiv = document.createElement('div');
        cardFaceDiv.classList.add('card-face');

        const cardArtDiv = document.createElement('div');
        cardArtDiv.classList.add('card-art');
        cardArtDiv.style.backgroundImage = `url(${row[2]})`; // Set the card art

        const cardNameDiv = document.createElement('div');
        cardNameDiv.classList.add('cardName');
        cardNameDiv.textContent = row[0]; // Set the card name

        const cardTextDiv = document.createElement('div');
        cardTextDiv.classList.add('cardText');
        cardTextDiv.textContent = row[1]; // Set the card text

        cardFaceDiv.appendChild(cardArtDiv);
        cardFaceDiv.appendChild(cardNameDiv);
        cardFaceDiv.appendChild(cardTextDiv);

        cardDiv.appendChild(cardFaceDiv);
        cardsContainer.appendChild(cardDiv);
    });
}

// Fetch the CSV and create cards when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchCSV('../assets/csv/index.csv')
        .then(data => {
            createCards(data);
        })
        .catch(error => {
            console.error('Error fetching CSV:', error);
        });
});
