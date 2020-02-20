var button = document.querySelector('button')

button.addEventListener('click', () => {
  $('button').css('display', 'none');
  $('#sphere').css('display', 'block');
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

          var left = 50 + x / 1.8;
          var top = 50 + y / 1.8;

          handleOrientationEvent(left, top);
        })
      }

      var handleOrientationEvent = function(left, top) {
        $('#sphere').css('top', top + "vh");
        $('#sphere').css('left', left + "vw");
      };
    })
    .catch(console.error)
})
