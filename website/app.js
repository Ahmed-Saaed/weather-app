/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=7699888812ddd206b2ad73e85cacb50d';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', myAction);

function myAction(event) {
  let zipCode = document.getElementById('zip').value;
  let feeling = document.getElementById('feelings').value;

  getWeather(baseURL, zipCode, apiKey)
    //chain promises
    .then((data) => {
      // Add data
      console.log(data);
      postData('/add', {date:d, weather:data.main.temp, feeling:feeling})
    })
    updateUI();
}

// get the weather data from our api using async get function
const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL+zip+key);
  let data;

  try {
    data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// our async function that will post all our data to the route

const postData = async (url = '', data = {}) => {
  let res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match the header
  });

  try {
    const myData = await res.json();
    console.log(myData);
    return myData;
  } catch (error) {
    console.log('error', error);
  }
};

// update ui function
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById(
      'temp'
    ).innerHTML = ` the weather today:${allData.weather}`;
    document.getElementById(
      'content'
    ).innerHTML = `I am feeling ${allData.feeling} today`;
  } catch (error) {
    console.log('error', error);
  }
};
