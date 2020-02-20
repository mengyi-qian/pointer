var button = document.querySelector('button')

button.addEventListener('click', () => {
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

          var left = 50 + x / 3.6;
          var top = 50 + y / 3.6;

          handleOrientationEvent(x, y, z);
        })
      }

      var handleOrientationEvent = function(x, y, z) {
        $('#sphere').css('top', top + "vh");
        $('#sphere').css('left', left + "vw");
      };
    })
    .catch(console.error)
})
