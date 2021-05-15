// ------------------------------------------
//  CONST
// ------------------------------------------
const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const url = 'https://randomuser.me/api/';
const imgUrl = 'https://randomuser.me/api/?results=12';

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(e => console.log('looks like there was a problem', e));
};

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
    if (response.ok === true) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    };
};

async function generateData(url) {
    const img = await fetchData(url);
    const response = img.results.map(async data => data);

    return Promise.all(response);
};

function generateHTML(data) {
    const html = data.map((data) => `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
    </div>
    `).join(' ');

    gallery.innerHTML = html;
};


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
generateData(imgUrl)
    .then(generateHTML)

console.log(generateData(imgUrl))