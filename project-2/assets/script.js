var button = document.querySelector('button')

button.addEventListener('click', () => {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', (e) => {
          console.log(e);
          // alpha: rotation around z-axis
          var rotateDegrees = e.alpha;
          // gamma: left to right
          var leftToRight = e.gamma;
          // beta: front back motion
          var frontToBack = e.beta;

          handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
        })
      }

      var handleOrientationEvent = function(frontToBack, leftToRight, rotateDegrees) {
        sphere.style.top = frontToBack;
    		sphere.style.left = leftToRight;
      };
    })
    .catch(console.error)
})
