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
