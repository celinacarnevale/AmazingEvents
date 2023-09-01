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
                    <h4 class="card-title">${event.name}</h4>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="card-body d-flex flex-wrap justify-content-between align-items-center">
                    <h5 class="mb-0">$${event.price}</h5>
                    <button type="button" class="btn btn-lg btn-outline-primary">Details</button>
                </div>
            </div>
        </div>`
    }
    return template
}

let cardTemplate = addEvent(future)

console.log(future)

let cards = document.querySelector('.eventcards')
cards.innerHTML += cardTemplate

//funcion para favoritos
let favorites = document.querySelectorAll('.favorite');
favorites.forEach(function (button) {
    button.addEventListener('click', function () {
        this.classList.toggle('style');
    });
});