document.querySelector('button').addEventListener('click', () => {
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
