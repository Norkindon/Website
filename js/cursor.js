document.addEventListener('DOMContentLoaded', function () {
  const cursorContainer = document.getElementById('cursor-container');
  const followMouse = document.getElementById('custom-cursor');
  let fingerhand = '../assets/hand/fingerhand.png';
  let fingerhandclicked = 'url("../assets/hand/fingerhandclicked.png")';

  // Function to set cursor size based on screen dimensions
  function setCursorSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const cursorSize = Math.min(screenWidth, screenHeight) * 2; // Adjust the scaling factor as needed

    followMouse.style.width = cursorSize + 'px';
    followMouse.style.height = cursorSize + 'px';
  }

  // Function to update cursor position based on mouse or touch coordinates
  function updateCursorPosition(x, y) {
    setCursorSize();
    followMouse.style.left = x - followMouse.offsetWidth / 2.4 + 'px';
    cursorContainer.style.top = y + 'px';
  }

  // Mouse move event
  document.addEventListener('mousemove', function (e) {
    updateCursorPosition(e.clientX, e.clientY);
  });

  // Touch move event
  document.addEventListener('touchmove', function (e) {
    const touch = e.touches[0];
    updateCursorPosition(touch.clientX, touch.clientY);
  });

  // Mouse click event
  document.addEventListener('mousedown', function () {
    followMouse.style.backgroundImage = fingerhandclicked;
  });

  // Touch start event
  document.addEventListener('touchstart', function () {
    followMouse.style.backgroundImage = fingerhandclicked;
  });

  // Mouse up event
  document.addEventListener('mouseup', function () {
    followMouse.style.backgroundImage = 'url("' + fingerhand + '")';
  });

  // Touch end event
  document.addEventListener('touchend', function () {
    followMouse.style.backgroundImage = 'url("' + fingerhand + '")';
  });

  // Load image
  const tempImage = new Image();
  tempImage.src = fingerhand;

  tempImage.onload = function () {
    setCursorSize();
    followMouse.style.backgroundImage = 'url("' + fingerhand + '")';
    followMouse.style.backgroundImage = 'url("' + fingerhandclicked + '")';
  };

  // Resize event listener to update cursor size on window resize
  window.addEventListener('resize', setCursorSize);
});




// var x;
// var $cards = $(".card");
// var $style = $(".hover");

// $cards
//   .on("mousemove touchmove", function(e) { 
//     // normalise touch/mouse
//     var pos = [e.offsetX,e.offsetY];
//     e.preventDefault();
//     if ( e.type === "touchmove" ) {
//       pos = [ e.touches[0].clientX, e.touches[0].clientY ];
//     }
//     var $card = $(this);
//     // math for mouse position
//     var l = pos[0];
//     var t = pos[1];
//     var h = $card.height();
//     var w = $card.width();
//     var px = Math.abs(Math.floor(100 / w * l)-100);
//     var py = Math.abs(Math.floor(100 / h * t)-100);
//     var pa = (50-px)+(50-py);
//     // math for gradient / background positions
//     var lp = (50+(px - 50)/1.5);
//     var tp = (50+(py - 50)/1.5);
//     var px_spark = (50+(px - 50)/7);
//     var py_spark = (50+(py - 50)/7);
//     var p_opc = 20+(Math.abs(pa)*1.5);
//     var ty = ((tp - 50)/2) * -1;
//     var tx = ((lp - 50)/1.5) * .5;
//     // css to apply for active card
//     var grad_pos = `background-position: ${lp}% ${tp}%;`
//     var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
//     var opc = `opacity: ${p_opc/100};`
//     var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
//     // need to use a <style> tag for psuedo elements
//     var style = `
//       .card:hover:before { ${grad_pos} }  /* gradient */
//       .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
//     `
//     // set / apply css class and style
//     $cards.removeClass("active");
//     $card.removeClass("animated");
//     $card.attr( "style", tf );
//     $style.html(style);
//     if ( e.type === "touchmove" ) {
//       return false; 
//     }
//     clearTimeout(x);
//   }).on("mouseout touchend touchcancel", function() {
//     // remove css, apply custom animation on end
//     var $card = $(this);
//     $style.html("");
//     $card.removeAttr("style");
//     x = setTimeout(function() {
//       $card.addClass("animated");
//     },2500);
//   });


