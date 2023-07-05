
document.addEventListener('DOMContentLoaded', function(){
    updateWeatherInfo();
    buttonUnitConversion();
    
  });
  
  function updateWeatherInfo(){
    let isRandomStr = arguments[0]
  if (navigator.geolocation || arguments[0]){
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude 
        let lon = position.coords.longitude
        // random call
        if(isRandomStr === 'random'){
          lat = parseInt(Math.random() * 180 - 90) + parseFloat(Math.random().toFixed(5))
          lon = parseInt(Math.random() * 360 - 180) + parseFloat(Math.random().toFixed(5))
          console.log(`random gps at ${lat} , ${lon}`)
        }
       
        
        fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`)
         .then(res => res.json())
         .then(data => {
          document.querySelector('#userLocation').innerHTML= data.name + "," + data.sys.country
          document.querySelector('#wind').innerHTML= 'wind speed  : ' + data.wind.speed.toFixed(1) + ' m/s'
          document.querySelector('#temperature').innerHTML= 'Temp : ' + data.main.temp.toFixed(1) + '°C'
          document.querySelector('#humidity').innerHTML= 'humidity : ' + data.main.humidity + '%'
          document.querySelector('#feels_like').innerHTML= 'Feels like  : ' + data.main.feels_like.toFixed(1) + '°C'
          document.querySelector('#weather').innerHTML= data.weather[0].main
          document.querySelector('#weather_desc').innerHTML= data.weather[0].description
          document.querySelector('#icon').setAttribute('src', data.weather[0].icon)
          document.querySelector('#dateDisplay').innerHTML = new Date().toUTCString().split(' ').slice(0,-3).join(' ')
          updateBackground(parseFloat(data.main.temp));
          updateUndefinedLocation();
          // console.log(data)
        })
      })
    } else {
      document.getElementById('userLocation').innerHTML = 'Failed to get geo location'
    }
  } 
  
  function buttonUnitConversion(){
    document.querySelector('#unitBtn').addEventListener('click', e => {
        let button = e.target
        if(button.getAttribute("unit") == 'celsius'){ // was in celsius
          let x = document.querySelector('#temperature')
          let num = x.innerHTML.split('°')[0].split(':')[1]
          x.innerHTML= 'Temp : ' + (parseFloat(num) * 9 / 5 + 32).toFixed(1) + '°F'
          
          x = document.querySelector('#feels_like')
          num = x.innerHTML.split('°')[0].split(':')[1]
          x.innerHTML= 'Feels like : ' + (parseFloat(num) * 9 / 5 + 32).toFixed(1) + '°F'
          button.setAttribute('unit','fahrenheit')
          button.innerHTML = 'in °C'
        } else { // was in F
          let x = document.querySelector('#temperature')
          let num = x.innerHTML.split('°')[0].split(':')[1]
          x.innerHTML= 'Temp : ' + ((parseFloat(num) - 32 ) * 5 / 9).toFixed(1) + '°C'
          
          x = document.querySelector('#feels_like')
          num = x.innerHTML.split('°')[0].split(':')[1]
          x.innerHTML= 'Feels like : ' + ((parseFloat(num) - 32 ) * 5 / 9).toFixed(1) + '°C'
          button.setAttribute('unit','celsius')
          button.innerHTML = 'in °F'
        }
    })
  }
  
  function updateBackground(temp){
    let colorCode = ""
    // console.log(temp)
    // console.log(typeof temp)
    
    switch(true){
      case temp >= 40:
        colorCode = 'Maroon'
        break;
      case temp >= 30:
        colorCode = 'LightCoral'
        break;
      case temp >= 20:
        colorCode = 'LavenderBlush'
        break;
      case temp >= 10:
        colorCode = 'HoneyDew'
        break;
      case temp <= -10:
        colorCode = 'CornflowerBlue'
        break;
      case temp <= 0:
        colorCode = 'LightSkyBlue'
        break;
      case temp <= 9:
        colorCode = 'LightCyan'
        break;
      default :
        colorCode = 'white'
        break;
    }
    document.body.style.backgroundColor = colorCode
  }
  
  function updateUndefinedLocation(){
    let x = document.querySelector('#userLocation').innerHTML.split(',')
    console.log(x)
    if(x.includes('undefined')){
     document.querySelector('#userLocation').innerHTML= "Unknown area"
    }
  }