var x = 0, y = 0,
    vx = 0, vy = 0,
	ax = 0, ay = 0;

var sphere = document.getElementById("sphere");

var button = document.querySelector('button')

button.addEventListener('click', () => {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', (e) => {
          console.log(e);
        })
      }
    })
    .catch(console.error)
})



	setInterval( function() {
		var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
		if ( landscapeOrientation) {
			vx = vx + ay;
			vy = vy + ax;
		} else {
			vy = vy - ay;
			vx = vx + ax;
		}
		vx = vx * 0.98;
		vy = vy * 0.98;
		y = parseInt(y + vy / 50);
		x = parseInt(x + vx / 50);

		sphere.style.top = y + "px";
		sphere.style.left = x + "px";

	}, 25);
