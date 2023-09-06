let templatecards = ''

for (let event of data.events){
    templatecards += `<div class="col" style="max-width: 23vw">
        <div class="card h-100 shadow-lg bg-body-tertiary rounded">
            <div class="d-flex flex-wrap position-relative">
                <button class="favorite btn btn-lg position-absolute top-0 end-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=currentfill" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </button>
                <img src="${event.image}" class="card-img-top">
            </div>
            <div class="card-body d-flex flex-column align-items-center">
                <h4 class="card-title" id="cardTitle">${event.name}</h4>
                <p class="card-text">${event.description}</p>
            </div>
            <div class="card-body d-flex flex-wrap justify-content-between align-items-center">
                <h5 class="mb-0">$${event.price}</h5>
                <button type="button" class="btn btn-lg btn-outline-primary"><a href="./details.html?id=${event._id}" class="detailslink">Details</a></button>
            </div>
        </div>
    </div>`
}

let cards = document.getElementById('eventcards');

cards.innerHTML = templatecards;


//Para los checkbox que muestran categorias
const $checkContainer = document.getElementById('checkboxes')

const $cardContainer = document.getElementById('eventcards')

const nonRepeatCateg = [ ...new Set(data.events.map(events => events.category))]

//Creacion de la estructura de los Checkboxes
function estructuraChecks(string){
    let templatecheck = ''
    templatecheck = `<label class="form-check-label ms-3" for="category">
    <input class="form-check-input" type="checkbox" name="${string}" value="${string}" id="category">${string}
    </label>`

    return templatecheck
}

//Impresion de Checks en el HTML
function printCheck(array, HTMLelement){
    let estructure = ''
    array.forEach(string => {
        estructure += estructuraChecks(string)
    });

    HTMLelement.innerHTML = estructure;
}

printCheck(nonRepeatCateg, $checkContainer)

function createCard(objData){
    let templatecards = ''
    templatecards += `<div class="col" style="max-width: 23vw">
        <div class="card h-100 shadow-lg bg-body-tertiary rounded">
            <div class="d-flex flex-wrap position-relative">
                <button class="favorite btn btn-lg position-absolute top-0 end-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=currentfill" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </button>
                <img src="${objData.image}" class="card-img-top">
            </div>
            <div class="card-body d-flex flex-column align-items-center">
                <h4 class="card-title" id="cardTitle">${objData.name}</h4>
                <p class="card-text">${objData.description}</p>
            </div>
            <div class="card-body d-flex flex-wrap justify-content-between align-items-center">
                <h5 class="mb-0">$${objData.price}</h5>
                <button type="button" class="btn btn-lg btn-outline-primary"><a href="./details.html?id=${objData._id}" class="detailslink">Details</a></button>
            </div>
        </div>
    </div>`

    return templatecards
}

function printHTMLCard(array, HTMLelement){
    let structure = ''
    array.forEach(string => {
        structure += createCard(string)
    })

    HTMLelement.innerHTML = structure
}

//Funcion para favoritos
let favorites = document.querySelectorAll('.favorite');
favorites.forEach(function (button) {
    button.addEventListener('click', function () {
        this.classList.toggle('style');
    });
});

//Funcion para busqueda en search bar

//Funcion para retornar texto cuando no devuelve nada la busqueda

function printNotFound(elementoHTML, errorTemplate){
    elementoHTML.innerHTML = errorTemplate
}

//Event Listener para que procese los checkbox marcados

let events = data.events

const $search = document.getElementById('input')

function combinedFilters(){
    
    let filteredObj = ''
    const searchValue = $search.value.toLowerCase()
    let arrayValores = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
    // filteredObj = events.filter(event => arrayValores.includes(event.category))

    if(arrayValores.length === 0){
        filteredObj = events.filter(event => {
            //Filtramos los eventos en base al input ingresado
            const eventName = event.name.toLowerCase();
            return eventName.includes(searchValue);
        })
    } else {
        filteredObj = events.filter(event => {
            //Filtramos los eventos en base al input ingresado
            const eventName = event.name.toLowerCase();
            return eventName.includes(searchValue) && arrayValores.includes(event.category);
        })
    }

    
    let errorTemplate = ''
    errorTemplate = `<div class="container-fluid d-flex flex-column h-auto"><h4>Oops! Looks like we made a mistake.</h4>
                    <p>The element you searched was not found in our database, please try to look for it with another term!
                    If you think this is a mistake, please contact us.</p></div>`
    
    // Update the cards based on the filtered events
    if (filteredObj.length === 0) {
        printNotFound($cardContainer, errorTemplate)
    } else {
        printHTMLCard(filteredObj, $cardContainer);
    }
}

$checkContainer.addEventListener('change', combinedFilters)
$search.addEventListener('input', combinedFilters)