let getData = async () => {
     try {
          let locationCity = document.querySelector('.locationCity')
          let nextDays = document.querySelector('.nextdays')
          let top = document.querySelector('.top')
          let input = document.getElementById('search')
          //search input logic

          localStorage.setItem('key',input.value)

          let link = `https://weatherdbi.herokuapp.com/data/weather/${localStorage.getItem('key')}`

          input.value = localStorage.getItem('key')

          //fetch Api
          let weather = await fetch(link)
          .then(res => res.json())

          console.log(weather)

          // locationCity.innerText = weather.region

          if(weather.region === undefined) {
               locationCity.innerText = 'no location found with this name'
               document.querySelector('.conditions').style.display = 'none'
          } else {
               locationCity.innerText = weather.region
               document.querySelector('.conditions').style.display = 'block'
          }

          let currentIcon = document.querySelector('.origicon').setAttribute('src', weather.currentConditions.iconURL)
          // comment
          let comment = document.querySelector('.comment').innerText = weather.currentConditions.comment
          // wind km/h
          let windSpeed = document.querySelector('.wind').innerText = 'wind speed:' + ' ' + weather.currentConditions.wind.km + 'km/h'
          //temp c
          let currentTemp = document.querySelector('.temp').innerHTML = 'current temp:' + ' ' + weather.currentConditions.temp.c + '<sup>o</sup>C'
          
          nextDays.innerHTML = ''

          weather.next_days.forEach( element => { 
               nextDays.innerHTML += `
               <div class="card">
                    <h3>${element.day}</h3>
                    <div class="items">
                         <p class="condition">${element.comment}</p>
                         <img src="${element.iconURL}" alt="icon not found">
                    </div>
                    <div class="celsius">
                         <p class="maxtemp">max temp:${element.max_temp.c}c</p>
                         <p class="mintemp">min temp:${element.min_temp.c}c</p>
                    </div>
               </div>
               `
          });
          //click this card
          let card = document.querySelectorAll('.card')
          
     } catch (error) {
          console.log('error')
     }  
}
getData()
let searchIcon = document.querySelector('.searchIcon')
let input = document.getElementById('search')
let clearIcon = document.querySelector('.clearIcon')


//input event listeners
input.addEventListener('input', () => {
     //clearIcon
     input.value.length > 3 ? clearIcon.classList.add('active') 
     : clearIcon.classList.remove('active')

     //searchIcon

     input.value.length > 0 ? searchIcon.classList.add('active') 
     : searchIcon.classList.remove('active')

})

//clear input value logic
clearIcon.addEventListener('click', () => {
     input.value = ''
     clearIcon.classList.remove('active')
     searchIcon.classList.remove('active')
     input.focus()
})

searchIcon.addEventListener('click', () => {
     getData()
     let nextdays = document.querySelector('.netxdays')
     nextdays.innerHTML = ''
     input.blur()
})

input.addEventListener('keydown', (e) => {
     if(e.keyCode === 13){
          getData()
          let nextdays = document.querySelector('.netxdays')
          nextdays.innerHTML = ''
          input.blur()
     }
})



