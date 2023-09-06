const queryString = location.search

const events = data.events

const params = new URLSearchParams(queryString)

const id = params.get('id')

const objData = events.find(event => event._id == id)

console.log(objData)

const div = document.getElementById('detailcard')

div.innerHTML = `<div class="row g-0">
<div class="col-md-6">
  <img src="${objData.image}" class="img-fluid rounded-start">
</div>
<div class="col-md-6">
  <div class="card-body">
    <h5 class="card-title">${objData.name}</h5>
    <p class="card-text">${objData.category}</p>
    <p class="card-text">${objData.description}</p>
    <p class="card-text">Place: ${objData.place}</p>
    <p class="card-text">Capacity: ${objData.capacity}</p>
    <p class="card-text">Price: $${objData.price}</p>
  </div>
</div>
</div>`