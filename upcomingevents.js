let future =[];
let eventData = data.events

//Filtrado de eventos por fecha anterior a la actual
function eventsFilter(parameterArray){
    for (let event of parameterArray){
        if(Date.parse(`${event.date}`) > Date.parse(data.currentDate)){
            future.push(event)
        }
    }
}

//Inicializacion de la funcion de filtrado
eventsFilter(eventData)

//Agrega los eventos filtrados
function addEvent(filteredArrays){
    let template = '';
    for(let event of filteredArrays){
        template += `<div class="col" style="max-width: 23vw">
            <div class="card h-100 shadow-lg bg-body-tertiary rounded">
                <div class="d-flex flex-wrap position-relative">
                    <button class="favorite btn btn-lg position-absolute top-0 end-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentfill" class="bi bi-heart-fill" viewBox="0 0 16 16">
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
    return template
}

let cardTemplate = addEvent(future)

console.log(future)

let cards = document.getElementById('eventcards')
cards.innerHTML += cardTemplate

//Para los checkbox que muestran categorias
const $checkContainer = document.getElementById('checkboxes')

const $cardContainer = document.getElementById('eventcards')

const nonRepeatCateg = [ ...new Set(future.map(events => events.category))]

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

//Event Listener para que procese los checkbox marcados
$checkContainer.addEventListener('change', (e) => {
    let nodeList = document.querySelectorAll('input[type="checkbox"]:checked')
    let arrayValores = Array.from(nodeList).map(check => check.value)
    let filteredObj = future.filter( events => arrayValores.includes(events.category))
    
    //Para que cuando se deschequean los checkboxes aparezcan todas las cards
    if(filteredObj.length === 0){
        printHTMLCard(future, $cardContainer)
    } else {
        printHTMLCard(filteredObj, $cardContainer)
    }
})

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

//funcion para favoritos
let favorites = document.querySelectorAll('.favorite');
favorites.forEach(function (button) {
    button.addEventListener('click', function () {
        this.classList.toggle('style');
    });
});