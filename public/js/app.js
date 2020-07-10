




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{ //here e is for event
    e.preventDefault()//prevents page from refrshing when submit is clicked

    const location = search.value

    messageOne.textContent='loading...'
    messageTwo.textContent=''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }
        else{
            messageOne.textContent='location: '+data.foreCast.location
            messageTwo.textContent=`Current Temperature : ${data.foreCast.currtemp}C |
                                    Pressure: ${data.foreCast.pressure} millibar | Humidity:${data.foreCast.humidity}`
        }
    })
})
})
