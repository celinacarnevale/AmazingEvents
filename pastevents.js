let template = '';
let past =[];
let today = Date.now();
let dataEvent = data.events

function eventsFilter()

for (let event of past){
    console.log(today)
    if(event.date < today){
        template += `<div class="card h-100 px-0 shadow-lg mb-3 bg-body-tertiary rounded" style="max-width: 23vw;">
        <img src="${event.image}" class="card-img-top">
        <div class="card-body d-flex flex-column align-items-center">
            <h4 class="card-title">${event.name}</h4>
            <p class="card-text">${event.description}</p>
        </div>
        <div class="card-body d-flex flex-wrap justify-content-between align-items-center">
            <h5 class="mb-0">${event.price}</h5>
            <button type="button" class="btn btn-lg btn-outline-primary">Details</button>
        </div>`
    }
}

let cards = document.querySelector('.eventcards');

cards.innerHTML += template;