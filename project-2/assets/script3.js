$('#cursor').hide();

const radiusX = (window.screen.width - $('button').width) / 2;
const radiusY = (window.screen.height - $('button').height) / 2;

var button = document.querySelector('button')
var position = $('#cursor').position();
var left = position.left;
var top = position.top;

button.addEventListener('click', () => {
  $('button').fadeOut('slow');
  $('#cursor').delay(1000).fadeIn('slow');
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', (e) => {
          console.log(e);
          // alpha: rotation around z-axis
          var zRotation = e.alpha;
          // gamma: left to right
          var xRotation = e.gamma;
          // beta: front back motion
          var yRotation = e.beta;

          var x = 0;
          var y = 0;

          setInterval( function() {

            if (Math.abs(left) >= radiusX || Math.abs(top) >= radiusY) {
              x = x;
              y = y;
            } else {
              x =  x + xRotation * 0.98;
          		y = y + yRotation * 0.98;
            }

            $('#cursor').css({transform: `translate(${x + "px"}, ${y + "px"})`});

        	}, 25);

        })
      }

    })
    .catch(console.error)
})
