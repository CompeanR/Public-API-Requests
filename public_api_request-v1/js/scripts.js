// ------------------------------------------
//  CONST
// ------------------------------------------
const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const dataUrl = 'https://randomuser.me/api/?nat=ie&results=12';

createDiv();

let cards;
let modal = document.querySelector('.modals')
let usersData = [];
let cardsButton;

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------
async function generateData(url) {
    try {
        const res = await fetch(url);
        usersData = await res.json();
        mapData = usersData.results.map(data => data);
        
        generateSearchBar();
        generatePage(mapData);

    } catch (err) {
        console.error(err);
    };
};

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

//This function will generate all the data from our API into the web page
function generatePage(data) {
    const html = data.map((object) => `
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

    createModel(mapData);
    cardsListeners();
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

function createModel(data) {
    const modalDiv = document.querySelector('.modals');

    const modalWindow = data.map(data => `
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

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `).join(' ');
    
    modalDiv.innerHTML = modalWindow;
  
    modal = document.querySelectorAll('.modals .modal-container');
    modal.forEach(data => data.style.display = 'none');

    cardsButton = document.querySelector('.modals .modal-container .modal-btn-container')
};

function cardsListeners() {
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

function createDiv() {
    const newDiv = document.createElement('div');
    newDiv.className = 'modals';

    body.insertAdjacentElement('beforeend', newDiv);
};

// ------------------------------------------
//  LISTENERS
// ------------------------------------------
searchContainer.addEventListener('keyup', e => {
    const targetName = e.target.value.toLowerCase();
   
    const filterUsers = usersData.results.filter(user => {
        return (user.name.first.toLowerCase().includes(targetName) ||
                user.name.last.toLowerCase().includes(targetName)
        );
    });

    generatePage(filterUsers);
    createModel(filterUsers);
    cardsListeners();
});

modal.addEventListener('click', e => {

    if (e.target.id === 'modal-next') {
        const nextEle = e.target.parentElement.parentElement.nextElementSibling;
        
        if (nextEle) {
            e.target.parentElement.parentElement.style.display = 'none';
            e.target.parentElement.parentElement.nextElementSibling.style.display = 'block';
        };
        
    } else if (e.target.id === 'modal-prev') {
        const prevEle = e.target.parentElement.parentElement.previousElementSibling;

        if (prevEle) {
            e.target.parentElement.parentElement.style.display = 'none';
            e.target.parentElement.parentElement.previousElementSibling.style.display = 'block';
        };

    };
});

generateData(dataUrl);