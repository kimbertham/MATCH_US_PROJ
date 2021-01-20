export const cLocation = () => {
  navigator.geolocation.getCurrentPosition(p => {
    return `${p.coords.latitude}, ${p.coords.longitude}`
  })
}