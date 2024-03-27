//https://codepen.io/osublake/pen/e72106811a34efcccff91a03568cc790.js?v=3

class SmoothScroll {
  constructor(options) {

    this.endThreshold = 0.05;
    this.requestId = null;
    this.maxDepth = 10;
    this.viewHeight = 0;
    this.halfViewHeight = 0;
    this.maxDistance = 0;
    this.viewWidth = 0;
    this.halfViewWidth = 0;
    this.maxDistanceWidth = 0;
    this.scrollHeight = 0;
    this.endScroll = 0;
    this.returnCurrentScroll = 0;
    this.currentScroll = 0;
    this.scrollTransform = 0;
    this.horizontalScroll = 0;
    this.resizeRequest = 1;
    this.scrollRequest = 0;
    this.scrollItems = [];
    this.lastTime = -1;
    this.maxElapsedMS = 100;
    this.targetFPMS = 0.06;

    // this.scrollBody = options.scrollBody;
    // this.scrollSpacer = options.scrollSpacer;

    this.target = options.target;

    this.scrollEase = options.scrollEase != null ? options.scrollEase : 0.1;
    this.maxOffset = options.maxOffset != null ? options.maxOffset : 500;

    this.horizontalScrollWrapper = options.horizontalScrollWrapper;

    this.horizontalScrollTarget = options.horizontalScrollTarget;

    this._horziontalSetHeihgt();

    this.childElements = this._childElements();

    this.rectHorStart = this.horizontalScrollWrapper.getBoundingClientRect();

    this.horzItemStart = {
      top: this.rectHorStart.top,
      bottom: this.rectHorStart.bottom,
      height: this.rectHorStart.height
    }

    this.addItems();

    window.addEventListener("resize", this._onResize);
    window.addEventListener("scroll", this._onScroll);
    //this.scrollBody.addEventListener("scroll", this._onScroll);

    this._update();
  }

  _childElements = (event) => {
    const childElementsNode = this.target.querySelectorAll("*[data-color]");
    return childElementsNode;
  }

  _horizonstalScrollRect = (event) => {
    const horzintalRect = this.horizontalScrollTarget.getBoundingClientRect();
    return horzintalRect;
  }

  _lastScrollRect = (event) => {
    const lastScrollRect = this.horizontalScrollTarget.lastElementChild.getBoundingClientRect();
    return lastScrollRect;
  }

  _horziontalSetHeihgt = (event) => {
    let horScrHeight = 0;
    if (
      this.horizontalScrollTarget !== null &&
      this.horizontalScrollWrapper !== null
    ) {
      const lastScrollRect = this._lastScrollRect();
      horScrHeight = this.horizontalScrollTarget.scrollWidth - lastScrollRect.width + this._horizonstalScrollRect().height;
      this.horizontalScrollWrapper.style.height = horScrHeight + "px";
    }
  }

  _onResize = (event) => {
    this.resizeRequest++;
    if (!this.requestId) {
      this.lastTime = performance.now();
      this.requestId = requestAnimationFrame(this._update);
    }
  };

  _onScroll = (event) => {
    this.scrollRequest++;
    if (!this.requestId) {
      this.lastTime = performance.now();
      this.requestId = requestAnimationFrame(this._update);
    }
  };

  _horizonstalScroll = (scrollY, dt) => {
    if (this.horizontalScrollWrapper !== null) {
      const rectHor = this.horizontalScrollWrapper.getBoundingClientRect();
      const lastScrollRect = this._lastScrollRect();

      const itemHor = {
        target: this.horizontalScrollTarget,
        targetRect: this._horizonstalScrollRect(),
        top: rectHor.top,
        bottom: rectHor.bottom + scrollY,
        topScroll: rectHor.top + scrollY,
        horizonstalMove: 0,
      };

      itemHor.horizonstalMove += this.currentScroll - this.horzItemStart.top;
      if (scrollY >= this.horzItemStart.top && scrollY <= this.horzItemStart.bottom - itemHor.targetRect.height) {
        itemHor.target.style.position = 'fixed';
        itemHor.target.style.transform = `translate3d(-${itemHor.horizonstalMove}px,0px,0px)`;

        //this._paralaxHorizontal(dt);

        if (lastScrollRect.x <= (lastScrollRect.width / 2)) {
          this.scrollTransform = this.horzItemStart.bottom - itemHor.targetRect.height;
          itemHor.target.style.top = this.horzItemStart.bottom - itemHor.targetRect.height + 'px';
        } else {
          this.scrollTransform = this.horzItemStart.top;
          itemHor.target.style.top = this.horzItemStart.top + 'px';
        }
      }
    }
  };

  _changeColorBody = (event) => {

    if (this.childElements.length > 0) {
      this.childElements.forEach(child => {
        const wrapper = document.querySelector('.change_color_page');
        const childRect = child.getBoundingClientRect();
        const childAttr = child.getAttribute('data-color');

        if (childRect.y <= this.halfViewHeight && childRect.bottom >= this.halfViewHeight) {
          if (childAttr == "off_white") {
            if (!document.body.classList.contains('white')) {
              document.body.classList.add('white');
            }
            if (!wrapper.classList.contains('white')) {
              wrapper.classList.add('white');
            }
          } else if (childAttr == "dark") {
            if (document.body.classList.contains('white')) {
              document.body.classList.remove('white');
            }
            if (wrapper.classList.contains('white')) {
              wrapper.classList.remove('white');
            }
          }
        }
      });
    }

  }

  _update = (currentTime = performance.now()) => {
    let elapsedMS = currentTime - this.lastTime;

    if (elapsedMS > this.maxElapsedMS) {
      elapsedMS = this.maxElapsedMS;
    }

    const deltaTime = elapsedMS * this.targetFPMS;
    const dt = 1 - Math.pow(1 - this.scrollEase, deltaTime);

    const resized = this.resizeRequest > 0;
    const scrollY = window.pageYOffset;
    //const scrollY = this.scrollBody.scrollTop;

    if (resized) {
      this._horziontalSetHeihgt();
      const height = this.target.clientHeight;
      document.body.style.height = height + "px";
      //this.scrollSpacer.style.height = height + "px";
      this.scrollHeight = height;
      this.viewHeight = window.innerHeight;
      this.halfViewHeight = this.viewHeight / 2;
      this.maxDistance = this.viewHeight * 2;
      this.resizeRequest = 0;
      this.viewWidth = window.innerWidth;
      this.halfViewWidth = this.viewWidth / 2;
      this.maxDistanceWidth = this.viewWidth * 2;
    }

    this.endScroll = scrollY;
    // this.scrollTransform += (scrollY - this.scrollTransform) * this.scrollEase;
    this.scrollTransform += (scrollY - this.scrollTransform) * dt;
    this.currentScroll += (scrollY - this.currentScroll) * dt;

    if (Math.abs(scrollY - this.currentScroll) < this.endThreshold || resized) {
      this.currentScroll = scrollY;
      this.scrollRequest = 0;
    }

    if (
      Math.abs(scrollY - this.scrollTransform) < this.endThreshold ||
      resized
    ) {
      this.scrollTransform = scrollY;
      this.scrollRequest = 0;
    }

    ///change color section
    this._changeColorBody();

    ///horizontal scroll
    this._horizonstalScroll(this.currentScroll, dt);

    // const scrollOrigin = scrollY + this.halfViewHeight;
    const scrollOrigin = this.currentScroll + this.viewHeight;

    this.target.style.transform = `translate3d(0px,-${this.scrollTransform}px,0px)`;

    //items
    for (let i = 0; i < this.scrollItems.length; i++) {
      const item = this.scrollItems[i];

      const distance = scrollOrigin - item.top;
      const offsetRatio = distance / this.maxDistance;

      item.endOffset = Math.round(
        this.maxOffset * item.depthRatio * offsetRatio
      );

      if (Math.abs(item.endOffset - item.currentOffset < this.endThreshold)) {
        item.currentOffset = item.endOffset;
      } else {
        // item.currentOffset += (item.endOffset - item.currentOffset) * this.scrollEase;
        item.currentOffset += (item.endOffset - item.currentOffset) * dt;
      }
      if (item.direction == "y") {
        item.target.style.transform = `translate3d(0px,${item.currentOffset}px,0px)`;
      } else if (item.direction == "x") {
        item.target.style.transform = `translate3d(${item.currentOffset}px,0px,0px)`;
      }
    }

    this.lastTime = currentTime;

    this.requestId =
      this.scrollRequest > 0 ? requestAnimationFrame(this._update) : null;
  };

  addItems() {
    this.scrollItems = [];
    const elements = document.querySelectorAll("*[data-depth]");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const depth = +element.getAttribute("data-depth");
      const direction_item = element.getAttribute("data-direction");
      const rect_item = element.getBoundingClientRect();
      const item = {
        rect: rect_item,
        target: element,
        top: rect_item.top + window.pageYOffset,
        //top: rect_item.top + this.scrollBody.scrollTop,
        depth: depth,
        depthRatio: depth / this.maxDepth,
        currentOffset: 0,
        endOffset: 0,
        direction: direction_item
      };
      this.scrollItems.push(item);
    }
    return this;
  }

  currentScrollReturn() {
    return this.currentScroll;
  }
}

document.documentElement.style.setProperty(
  "--scrollbar-size",
  getScrollbarSize() + "px"
);

var scroller = new SmoothScroll({
  // scrollBody: document.querySelector(".scroll-content"),
  // scrollSpacer: document.querySelector(".spacer"),
  target: document.querySelector(".scroll-container"), // element container to scroll
  scrollEase: 0.05,
  horizontalScrollWrapper: document.querySelector(".horizontal-scroll-wrapper"),
  horizontalScrollTarget: document.querySelector(".horizontal-scroll")
});

function getScrollbarSize() {
  var div = document.createElement("div");
  div.classList.add("scrollbar-test");
  document.body.appendChild(div);
  var size = div.offsetWidth - div.scrollWidth;
  document.body.removeChild(div);
  return size;
}




//jump to div
function scrollToFloor() {
  var greenBox = document.querySelector('.redblock');
  greenBox.scrollIntoView({ behavior: 'smooth' });
}


function scrollToAboutMe() {
  var greenBox = document.querySelector('.redblock');
  greenBox.scrollIntoView({ behavior: 'smooth' });
}

function scrollToPortfolio() {
  var greenBox = document.querySelector('.greenblock');
  greenBox.scrollIntoView({ behavior: 'smooth' });
}

function scrollToShop() {
  var greenBox = document.querySelector('.serviceblock');
  greenBox.scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
  var greenBox = document.querySelector('.footer');
  greenBox.scrollIntoView({ behavior: 'smooth' });
}





//scale cards near footer

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector('.footer');
  const cardsContainer = document.querySelector('.cards');

  function scaleCards() {
    const footerTop = footer.getBoundingClientRect().top;
    const cardsTop = cardsContainer.getBoundingClientRect().top;
    const cardsHeight = cardsContainer.offsetHeight;

    // Calculate the distance from the bottom of the viewport to the top of the cards
    const cardsBottom = window.innerHeight - cardsTop;

    // Check if the cards container is about to overlap with or be below the footer
    if (cardsBottom > footer.clientHeight) {
      // Calculate the scaling factor based on how close the cards are to the footer
      const scale = 1 - (cardsBottom - footer.clientHeight) / cardsHeight;

      // Apply the scaling factor
      cardsContainer.style.transform = `scale(${scale})`;
    } else {
      // If the cards are not close to the footer, keep them at normal scale
      cardsContainer.style.transform = 'scale(1)';
    }
  }

  window.addEventListener('scroll', scaleCards);
});


//aboutmetext

window.onload = function () {
  var textContainer = document.getElementById('text-container');
  var parentDiv = document.querySelector('.textbox');

  var parentWidth = parentDiv.offsetWidth;
  var parentHeight = parentDiv.offsetHeight;
  var textContainer = document.getElementById('text-container');

  var fontSize = 1; // Initial font size


  fetch('./assets/text/aboutme.txt') // Adjust the URL to navigate one folder back and then into assets/text/
    .then(response => response.text())
    .then(data => {
      textContainer.textContent = data; // Set the text content of the container
      textContainer.classList.add('reztext'); // Add the class to apply styles
    })
    .catch(error => {
      console.error('Error fetching text file:', error);
    });

  while (textContainer.offsetWidth < parentWidth && textContainer.offsetHeight < parentHeight) {
    fontSize += 0.1;
    textContainer.style.fontSize = fontSize + 'em';
  }
};

//footer



//header





//WelcomeText
// function getRandomValue(baseValue, deviation) {
//   return baseValue + (Math.random() * deviation - deviation / 2);
// }

// function applyRandomTransforms() {
//   const text = document.getElementById('welcomeTop');

//   // Scale
//   const baseScale = parseFloat(window.getComputedStyle(text).getPropertyValue('--start-scale'));
//   const scaleDeviation = 0.05; // Adjust the deviation as needed
//   const newStartScale = getRandomValue(baseScale, scaleDeviation);
//   const newMidScale = getRandomValue(parseFloat(window.getComputedStyle(text).getPropertyValue('--mid-scale')), scaleDeviation);
//   const newEndScale = getRandomValue(parseFloat(window.getComputedStyle(text).getPropertyValue('--end-scale')), scaleDeviation);

//   text.style.setProperty('--start-scale', newStartScale);
//   text.style.setProperty('--mid-scale', newMidScale);
//   text.style.setProperty('--end-scale', newEndScale);

//   // Rotation
//   const rotationDeviation = 10; // Adjust the deviation as needed
//   const newStartRotation = getRandomValue(parseFloat(window.getComputedStyle(text).getPropertyValue('--start-rotation')), rotationDeviation);
//   const newMidRotation = getRandomValue(parseFloat(window.getComputedStyle(text).getPropertyValue('--mid-rotation')), rotationDeviation);
//   const newEndRotation = getRandomValue(parseFloat(window.getComputedStyle(text).getPropertyValue('--end-rotation')), rotationDeviation);

//   text.style.setProperty('--start-rotation', newStartRotation + 'deg');
//   text.style.setProperty('--mid-rotation', newMidRotation + 'deg');
//   text.style.setProperty('--end-rotation', newEndRotation + 'deg');

//   // Skew
//   const skewDeviation = 5; // Adjust the deviation as needed
//   const newStartSkew = getRandomValue(parseFloat(window.getComputedStyle(text).getPropertyValue('--start-skew')), skewDeviation);
//   const newMidSkew = getRandomValue(parseFloat(window.getComputedStyle(text).getPropertyValue('--mid-skew')), skewDeviation);
//   const newEndSkew = getRandomValue(parseFloat(window.getComputedStyle(text).getPropertyValue('--end-skew')), skewDeviation);

//   text.style.setProperty('--start-skew', newStartSkew + 'deg');
//   text.style.setProperty('--mid-skew', newMidSkew + 'deg');
//   text.style.setProperty('--end-skew', newEndSkew + 'deg');

//   setTimeout(applyRandomTransforms, 5000); // Repeat every 5 seconds
// }

// applyRandomTransforms();



//email

    // Function to open the popup
    function openPopup() {
      // Dynamically generate HTML content for the popup
      var popupHTML = `
          <div class="overlay" id="overlay">
              <div class="popup">
                  <span class="close-btn" onclick="closePopup()">X</span>
                  <form class="email-form" action="send_email.php" method="post">
                      <input type="email" name="email" placeholder="Your Email" required><br>
                      <textarea name="message" placeholder="Your Message" rows="4" required></textarea><br>
                      <input type="submit" value="Send Email">
                  </form>
              </div>
          </div>
      `;
      // Insert the generated HTML into the document
      document.body.insertAdjacentHTML('beforeend', popupHTML);
      // Show the overlay
      document.getElementById('overlay').style.display = 'flex';
  }

  // Function to close the popup
  function closePopup() {
      // Remove the popup from the document
      document.getElementById('overlay').remove();
  }






//Contacts

document.addEventListener('DOMContentLoaded', function() {
  const instagramLink = document.getElementById('instagramLink');
  const linkedinLink = document.getElementById('linkedinLink');

  instagramLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default action of the link
    window.open('https://www.instagram.com/', '_blank'); // Opens in a new tab
});


  linkedinLink.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default action of the link
      window.location.href = 'https://www.linkedin.com/'; // Replace this with your LinkedIn URL
  });
});