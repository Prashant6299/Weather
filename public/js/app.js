const form = document.querySelector('form');
const search = document.querySelector('#location')
const loading = document.querySelector('.loading');
const errDiv = document.querySelector('.error');
const div = document.querySelector('.weather-data');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    console.log(location)
    errDiv.innerHTML = "";
    div.innerHTML = "";
    loading.innerHTML = '<br>Loading...';
    getWeather(location);
})


function getWeather(location){
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            loading.innerHTML = "";
            if(data.error){
                errDiv.innerHTML = '<br>'+data.error;
            }
            else{  
                
                div.innerHTML = '<br>Location: ' + data.location;
                div.innerHTML += '<br><br>Temperature: ' + data.forecast.temperature + ' degree celcius';
                div.innerHTML += '<br>Summary: ' + data.forecast.summary;
            }
        })
        
    })
}