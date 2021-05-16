// ------------------------------------------
//  CONST
// ------------------------------------------
const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const imgUrl = 'https://randomuser.me/api/?nat=ie&results=12';
let cards;
let modal;

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------
async function generateData(url) {
    try {
        const usersData = await fetch(url);
        const usersDataJson = await usersData.json();

        generateGallery(usersDataJson);
        createModel(usersDataJson);
        generateSearchBar();
        addEventListener();
    } catch (err) {
        console.error(err);
    };
};

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function generateGallery(data) {
    const html = data.results.map((object) => `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${object.picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${object.name.first} ${object.name.last}</h3>
            <p class="card-text">${object.email}</p>
            <p class="card-text cap">${object.location.city}, ${object.location.state}</p>
        </div>
    </div>
    `).join(' ');

    gallery.innerHTML = html;
    cards = document.querySelectorAll('#gallery .card');
};

function createModel(data) {
    
    const modalWindow = data.results.map(data => {
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
            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
        `;
        
        body.insertAdjacentHTML('beforeend', modalData);   
    });
    modalWindow.join(' ')

    modal = document.querySelectorAll('.modal-container');
    modal.forEach(data => data.style.display = 'none');
};

function addEventListener() {
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

function generateSearchBar() {
    const searchBar = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
    searchContainer.innerHTML = searchBar;

};

generateData(imgUrl)