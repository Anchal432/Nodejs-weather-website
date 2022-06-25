console.log("client-side js file is loaded");

// fetch('http://api.weatherstack.com/current?access_key=2bee12b6ba885af95b92a116dd5ea6a6&query=India').then((response) => {
//     response.json().then( (data) => {
//         if(data.error){
//             console.log('error', data.error);
//         }else{
//             console.log(data.location);
//         }
//     })
// })

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  msg1.textContent = 'Loading...'
  msg2.textContent = ''

  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
        //   console.log("error", data.error);
        msg1.textContent = data.error;
        } else {
            msg1.textContent = data.location;
            msg2.textContent = data.forecast;
        //   console.log(data.location);
        //   console.log(data.forecast);
        }
      });
    }
  );
});
