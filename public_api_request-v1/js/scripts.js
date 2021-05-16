// ------------------------------------------
//  CONST
// ------------------------------------------
const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const url = 'https://randomuser.me/api/';
const imgUrl = 'https://randomuser.me/api/?nat=ie&results=12';
let cards;
let modal;

// ------------------------------------------
//  FETCH FUNCTION
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
    cards = document.querySelectorAll('#gallery .card');
    return data
};

function createModel(data) {
    
    const modalWindow = data.map(data => {
        const modalData = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.thumbnail}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(${data.cell.slice(0, 3)}) ${data.cell.slice(4, 7)}-${data.cell.slice(8, 12)}</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: ${data.dob.date.slice(5, 7)}/${data.dob.date.slice(8, 10)}/2021</p>
            </div>
        </div>
        `;
        
        body.insertAdjacentHTML('beforeend', modalData);   
        return modalData
    })
    modalWindow.join(' ')

    modal = document.querySelectorAll('.modal-container');
    modal.forEach(data => data.style.display = 'none')
};


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// generateData(imgUrl)
//     .then(generateHTML)
//     .then(createModel)
    

// console.log(cards)
// gallery.addEventListener('click', (e) => {
//     const cards = document.querySelectorAll('#gallery .card')
//     // console.log(e.target)
//     if (e.target.className === 'card' || e.target.className === 'card-img-container' || e.target.className === 'card-info-container') {
//         console.log(e.target)
//     }
//     // if (cards.includes(e.target)) {
//     //     console.log(e.target)
//     // }
// })

async function trigger() {
    await generateData(imgUrl)
            .then(generateHTML)
            .then(createModel);
    
    cards.forEach((card, i) => {

        cards[i].addEventListener('click', e => {
            const currentCard = cards[i].children[1].children[0].textContent;
            const currentModal = modal[i].children[0].children[1].children[1].textContent;
            
            if (currentCard === currentModal) {
                modal[i].style.display = 'block';
            };
        });

        modal[i].addEventListener('click', e => {
            const currentButton = modal[i].children[0].children[0];

            if (currentButton === e.target || e.target.textContent === 'X') {
                modal[i].style.display = 'none';
            };
        });
    });
};

trigger()
// console.log(cards)

