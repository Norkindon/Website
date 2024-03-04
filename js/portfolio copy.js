// Define initSwiper function
function initSwiper() {
    // Your initialization code here
}




const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: false,
    speed: 1500,
    slidesPerView: 4,
    spaceBetween: 60,
    mousewheel: true,
    parallax: true,
    centeredSlides: true,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 40,
        slideShadows: true
    },
    // autoplay: {
    //   delay: 2000,
    //   pauseOnMouseEnter: true
    // },
    autoplay: false, // Disable autoplay
    scrollbar: {
        el: ".swiper-scrollbar"
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 60
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 60
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 60
        },
        1400: {
            slidesPerView: 4,
            spaceBetween: 60
        },
        2300: {
            slidesPerView: 5,
            spaceBetween: 60
        },
        2900: {
            slidesPerView: 6,
            spaceBetween: 60
        }
    }
});






document.addEventListener('DOMContentLoaded', function () {
    // Function to read and parse the CSV file
    function readCSVFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvData = event.target.result;
                resolve(csvData);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    }

    // Function to create HTML content from CSV data
    function createHTMLFromCSV(csvData) {
        // Parse CSV data
        const rows = csvData.split('\n').map(row => row.split(','));

        // Skip the first row
        const dataRows = rows.slice(1, rows.length - 1); // Exclude the first row and the last two empty rows

        // Iterate through rows and create HTML content
        dataRows.forEach(row => {
            const figure = document.createElement('figure');
            figure.classList.add('swiper-slide');

            const cardPopout = document.createElement('div');
            cardPopout.classList.add('cardPopout');
            cardPopout.setAttribute('data-swiper-parallax', '30');
            cardPopout.setAttribute('data-swiper-parallax-scale', '0.9');
            cardPopout.setAttribute('data-swiper-parallax-opacity', '0.8');
            cardPopout.setAttribute('data-swiper-parallax-duration', '1000');

            const img = document.createElement('img');
            img.src = row[1]; // Second box of the iterated row
            img.alt = row[2]; // Third box of the iterated row
            img.width = 400;
            img.height = 400;
            img.setAttribute('data-swiper-parallax', '80');
            img.setAttribute('data-swiper-parallax-duration', '2000');

            const title = document.createElement('h2');
            title.classList.add('title');
            title.textContent = row[2]; // Fourth box of the iterated row
            title.setAttribute('data-swiper-parallax', '80');
            title.setAttribute('data-swiper-parallax-duration', '1000');

            const subtitle = document.createElement('h4');
            subtitle.classList.add('subtitle');
            subtitle.textContent = row[3]; // Fifth box of the iterated row
            subtitle.setAttribute('data-swiper-parallax', '80');
            subtitle.setAttribute('data-swiper-parallax-duration', '1500');

            const figcaption = document.createElement('figcaption');
            figcaption.setAttribute('data-swiper-parallax', '80');
            figcaption.setAttribute('data-swiper-parallax-duration', '1250');
            figcaption.innerHTML = `<p>${row[4]}</p>`; // Sixth box of the iterated row

            const continueReadingLink = document.createElement('a');
            continueReadingLink.href = 'javascript:void(0);';
            continueReadingLink.title = 'Continue Reading';
            continueReadingLink.setAttribute('data-swiper-parallax', '80');
            continueReadingLink.setAttribute('data-swiper-parallax-opacity', '0.2');
            continueReadingLink.setAttribute('data-swiper-parallax-duration', '1750');
            continueReadingLink.textContent = 'Continue Reading';

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('width', '16');
            svg.setAttribute('height', '16');
            svg.setAttribute('fill', 'currentColor');
            svg.setAttribute('class', 'bi bi-arrow-right-short');
            svg.setAttribute('viewBox', '0 0 16 16');
            svg.innerHTML = `<path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />`;

            continueReadingLink.appendChild(svg);

            // Append elements to their respective parents
            figcaption.appendChild(continueReadingLink);
            cardPopout.appendChild(img);
            cardPopout.appendChild(title);
            cardPopout.appendChild(subtitle);
            cardPopout.appendChild(figcaption);
            figure.appendChild(cardPopout);

            // Append figure to the swiper container
            document.querySelector('.swiper-wrapper').appendChild(figure);
        });

        // Initialize Swiper
        initSwiper();
    }

    // Fetching CSV file
    fetch('../assets/csv/artportfolio.csv')
        .then(response => response.text())
        .then(data => {
            // Data is retrieved, now create HTML content
            createHTMLFromCSV(data);
        })
        .catch(error => {
            // Handle error if fetch fails
            console.error('Error fetching CSV file:', error);
        });
});

    