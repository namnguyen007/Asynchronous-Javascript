'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
 <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)}million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
 `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// const getCountryData = function(country) {
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();
// console.log(request.responseText);

// request.addEventListener('load', function () {
//   console.log(this.responseText);
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);

//   const html = `
//  <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${((data.population)/1000000).toFixed(1)}million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
//  `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// });
// }
// getCountryData('japan')
// getCountryData('thailand')
// getCountryData('usa')
// getCountryData('china')

const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor country (2)
    const [neighbor] = data.borders;
    // console.log(neighbor);

    if (!neighbor) return;

    // AJAX call country 2
    // AJAX call country 1
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbor('Norway');
// getCountryAndNeighbor('georgia');

// setTimeout(() => {
//   console.log('1s0');
//   setTimeout(() => {
//     console.log('1s0');
//     setTimeout(() => {
//       console.log('1s0');
//       setTimeout(() => {
//         console.log('1s0');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(request);

// const getCountryData = function(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(response) {
//     console.log(response);
//     return response.json();

//   }).then(function(data) {
//     console.log(data);
//     console.log(data[0]);
//     renderCountry(data[0])
//   })
// }

const getCountryDataByCallbackHell = function (country) {
  // Country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    // Country 2
    const [neighbor] = data.borders;
    if (!neighbor) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

// const getCountryDataByPromise = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[2];

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data, 'neighbour');
//       const neighbour = data.borders[1];
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data, 'neighbour');
//       const neighbour = data.borders[1];
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data, 'neighbour');
//       const neighbour = data.borders[1];
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data, 'neighbour');
//       const neighbour = data.borders[0];
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`aaaaa${err} 111111`);
//       renderError(`sth wrong: ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// getCountryDataByCallbackHell('Vietnam');

const getCountryDataByPromise = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[1];

      if (!neighbour) throw new Error('No neighbour');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not foundddddd'
      );
    })
    // .then(response => response.json())
    // .then(data => {
    //   renderCountry(data, 'neighbour');
    //   const neighbour = data.borders[1];
    //   return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    // })
    // .then(response => response.json())
    // .then(data => {
    //   renderCountry(data, 'neighbour');
    //   const neighbour = data.borders[1];
    //   return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    // })
    // .then(response => response.json())
    // .then(data => {
    //   renderCountry(data, 'neighbour');
    //   const neighbour = data.borders[1];
    //   return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    // })
    // .then(response => response.json())
    // .then(data => {
    //   renderCountry(data, 'neighbour');
    //   const neighbour = data.borders[0];
    //   return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    // })
    // .then(response => response.json())
    .then(data => {
      console.log(data);
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      console.error(`aaaaa${err} 111111`);
      renderError(`sth wrong: ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function (lat, lng) {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(lat, lng);
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      // console.log(response);
      if (!response.ok) throw new Error('Problem with geocoding');
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error('Country not found');
      return res.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
    })
    .catch(err => console.log(`${err.message}`, '❤❤'));
};

btn.addEventListener('click', whereAmI);

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
