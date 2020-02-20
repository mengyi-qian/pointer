$('#cursor').hide();

const radiusX = (window.screen.width - $('button').width) / 2;
const radiusY = (window.screen.height - $('button').height) / 2;

var button = document.querySelector('button')

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
          var position = button.position();
          var left = position.left
          var top = position.top

          setInterval( function() {

            if (Math.abs(left) >= radiusX || Math.abs(top) >= radiusY) {
              x = 0;
              y = 0;
            } else {
              x = xRotation * 0.98;
          		y = yRotation * 0.98;
            }

            $('#cursor').css({transform: `translate(${x + "px"}, ${y + "px"})`});

        	}, 25);

        })
      }

    })
    .catch(console.error)
})
