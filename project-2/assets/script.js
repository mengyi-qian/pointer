$('#cursor').hide();

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

          var left = left + 5 * x;
          var top = top + 5 * y;

          handleOrientationEvent(left, top);
        })
      }

      var handleOrientationEvent = function(left, top) {
        $('#cursor').css('top', top + "px");
        $('#cursor').css('left', left + "px");
      };
    })
    .catch(console.error)
})
