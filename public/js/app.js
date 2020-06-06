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
                messageOne.textContent = data.address
                messageTwo.textContent = data.forecast.weather.temperature
            }
        })
    })
})