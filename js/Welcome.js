function applyParticleEffectToFloorBox() {



  //Particles
  "use strict";

  const fps = 60;
  const interval = 1000 / fps;
  let lastTime = performance.now();
  let currentTime = 0;
  let delta = 0;
  let font = "700 italic 200px 'Cinzel Decorative', serif"
  const particleDensityDivider = 2;

  let mouseX = 0,
    mouseY = 0,
    mouseRadius = 200,
    mousePower = 15,
    particleDensity = 3,
    particleStiffness = 0.01,
    particleOffset = 0,
    particleFriction = 0.9,
    textMainColor = "#ffd700",
    particles = [],
    text = 'WELCOME!',
    isPopulated = false;

  const canvas = document.getElementById('welcomeCanvas');
  const context = canvas.getContext('2d');

  function init() {
    bindMouse();
    window.addEventListener('resize', onResize);
    onResize();
    render();
  }

  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    convertTextToParticle(); // Call convertTextToParticle again after resizing
  }

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = particleDensity / particleDensityDivider;
      this.spring = { x: x, y: y };
      this.dX = 0;
      this.dY = 0;
    }

    getDistanceTo(x, y) {
      const dX = x - this.x,
        dY = y - this.y;
      const dist = Math.sqrt(dX * dX + dY * dY);
      return { x: dX, y: dY, dist: dist };
    }

    repulseTo(x, y) {
      const distance = this.getDistanceTo(x, y);
      const repulseAngle = Math.atan2(distance.y, distance.x);
      const repulseForce = (-1 * Math.pow(mousePower, 2)) / distance.dist;
      this.dX += Math.cos(repulseAngle) * repulseForce;
      this.dY += Math.sin(repulseAngle) * repulseForce;
    }

    springTo() {
      this.dX += (this.spring.x - this.x) * particleStiffness;
      this.dY += (this.spring.y - this.y) * particleStiffness;
    }

    update() {
      this.springTo();
      this.dX *= particleFriction;
      this.dY *= particleFriction;
      this.x += this.dX;
      this.y += this.dY;
    }

    draw() {
      context.font = font;
      context.fillStyle = textMainColor;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fill();
    }
  }

  function bindMouse() {
    canvas.addEventListener('mousemove', (event) => {
      mouseX = event.clientX - canvas.offsetLeft;
      mouseY = event.clientY - canvas.offsetTop;
    });
  }

  function createParticle(x, y) {
    particles.push(new Particle(x, y));
  }

  function convertTextToParticle() {
    context.save();

    // Get the dimensions of the parent container
    const parentWidth = canvas.parentElement.clientWidth;
    const parentHeight = canvas.parentElement.clientHeight;

    // Calculate font size based on parent container dimensions
    const fontSize = Math.min(parentWidth, parentHeight) * 0.9; // Adjust the multiplier as needed

    context.fillStyle = textMainColor;

    // Use the calculated font size
    const font = `700 italic ${fontSize}% 'Cinzel Decorative', serif`;
    context.font = font;

    const textSize = context.measureText(text);
    const textHeight = 75;
    context.translate((canvas.width / 2) - (textSize.width / 2), canvas.height / 2);
    context.fillText(text, 0, textHeight);
    context.restore();

    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    particles = [];
    for (let y = 0; y < canvas.height; y += particleDensity) {
      for (let x = 0; x < canvas.width; x += particleDensity) {
        const opacity = image.data[((x + (y * canvas.width)) * 4 + 3)];
        if (opacity > 0) {
          createParticle(x, y);
        }
      }
    }

    isPopulated = true;
  }

  function update() {

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.getDistanceTo(mouseX, mouseY).dist <= mouseRadius + p.radius) {
        p.repulseTo(mouseX, mouseY);
      }
      p.update();
    }
  }

  function draw() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.draw();
    }
  }

  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function render() {
    currentTime = performance.now();
    delta = currentTime - lastTime;

    if (delta > interval) {
      update();
      clear();
      if (!isPopulated) {
        convertTextToParticle();
      } else {
        draw();
      }
      lastTime = currentTime - (delta % interval);
    }

    window.requestAnimationFrame(render);
  }

  init();
} 
applyParticleEffectToFloorBox();