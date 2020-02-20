var button = document.querySelector('button')

button.addEventListener('click', () => {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', (event) => {
          console.log(e);
          // alpha: rotation around z-axis
          var rotateDegrees = event.alpha;
          // gamma: left to right
          var leftToRight = event.gamma;
          // beta: front back motion
          var frontToBack = event.beta;

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
