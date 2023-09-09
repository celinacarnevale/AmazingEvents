const ApiUrl = "https://mindhub-xj03.onrender.com/api/amazing"

async function getAPI(){
    await fetch(ApiUrl)
        .then((response) => response.json())
        .then(data => {
            eventData = data.events
            const objData = eventData.find(event => event._id == id)
            printCard(objData)
  })
}

getAPI()

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get('id')

const div = document.getElementById('detailcard')

function printCard(array){
div.innerHTML = `<div class="row g-0">
    <div class="col-md-6">
    <img src="${array.image}" class="img-fluid rounded-start">
    </div>
    <div class="col-md-6">
    <div class="card-body">
        <h5 class="card-title">${array.name}</h5>
        <p class="card-text">${array.category}</p>
        <p class="card-text">${array.description}</p>
        <p class="card-text">Place: ${array.place}</p>
        <p class="card-text">Capacity: ${array.capacity}</p>
        <p class="card-text">Price: $${array.price}</p>
    </div>
    </div>
    </div>`
}