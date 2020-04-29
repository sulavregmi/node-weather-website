 console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From javaScript'


weatherForm.addEventListener('submit',(e) =>{
     e.preventDefault()

    const location = search.value

    messageOne.textContent ='Loading...'
    messageTwo.textContent=''
    
fetch('/weather?address='+location).then((response) =>{
    response.json().then((datas) =>{
        if(datas.error){
            messageOne.textContent = datas.error
        }else{
            messageOne.textContent = datas.location
            messageTwo.textContent = datas.forecast
        // console.log(datas.location)
        // console.log(datas.forecast)
    }
})
})

})

