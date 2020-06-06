console.log("Client side javascript loaded")
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data)
                messageOne.textContent = "It is " + data.forecast.weather.temperature + " degrees out there and it feels like " + data.forecast.weather.feelslike
                messageTwo.textContent = "Wind speed is " + data.forecast.weather.wind_speed + ", also there is a " + data.forecast.weather.humidity + "% chance of precipitation"
            }
        })
    })
})