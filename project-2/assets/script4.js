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
          var z = e.alpha;
          // gamma: left to right
          var x = e.gamma;
          // beta: front back motion
          var y = e.beta;

          var left = 0;
          var top = 0;

          setInterval( function() {

            if (Math.abs(left) >= radiusX || Math.abs(top) >= radiusY) {
              left = left;
              top = top;
            } else {
              left = left + x * 0.98;
          		top = top + y * 0.98;
            }

            $('#cursor').css('top', top + "px");
            $('#cursor').css('left', left + "px");

        	}, 25);

        })
      }

    })
    .catch(console.error)
})