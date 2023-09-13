let past = []
let future = []
let assistance = []
let highAssistance = []
let lowestAssistance = []
let capacity = []
let tableCalcsCapacity = []
let tableCalcsAssistance = []
let firstTableCalcs = []
let name = []

const ApiUrl = "https://mindhub-xj03.onrender.com/api/amazing"

async function getAPI(){ 
    await fetch(ApiUrl)
    .then((response) => response.json())
    .then(data => {
    eventData = data.events
    currentDate = data.currentDate

    //filtrado de eventos pasados
    eventsFilterPast(eventData, currentDate)
    //filtrado de eventos futuros
    eventsFilterFuture(eventData, currentDate)

    tableCalculations(future, past)
    console.log(tableCalcsCapacity)
    console.log(tableCalcsAssistance)
    console.log(firstTableCalcs)

    firstTableCalcs.assistance = 

    asignFirstStructure(firstTableCalcs)
    printFirstTable(firstTableCalcs, $firstTableContainer)

    //separo las categorias de cada array y las filtro para que no se repitan
    const futureArray = [ ...new Set(future.map(eventData => eventData.category))]
    const pastArray = [ ...new Set(past.map(eventData => eventData.category))]

    //Inicializo las funciones para calcular lo pedido en cada array (futuro y pasado)
    getRevenue(futureArray, future)
    asignStructure(calculations)
    printTables(calculations, $secondTableContainer)

    getRevenue(pastArray, past)
    asignStructure(calculations)
    printTables(calculations, $thirdTableContainer)
  })
}

getAPI()

function tableCalculations(firstArray, secondArray){
  firstArray.forEach((event) => {
    tableCalcsCapacity.push([name= event.name, capacity= event.capacity])
  })
  secondArray.forEach((event) => {
    tableCalcsCapacity.push([name= event.name, capacity= event.capacity])
    tableCalcsAssistance.push([name= event.name, assistance= ((event.assistance / event.capacity) * 100)])
  })

 //Events with highest % of assistance
  highAssistance = tableCalcsAssistance.reduce((cur, prev) => {
    return (cur[1] > prev[1])? cur : prev
  })
  //Events with lowest % of assistance
  lowestAssistance = tableCalcsAssistance.reduce((cur, prev) => {
  return (cur[1] < prev[1])? cur : prev})
  //Events with larger capacity
  capacity = tableCalcsCapacity.reduce((cur, prev) => {return (cur[1] > prev[1]) ? cur : prev})
 
  firstTableCalcs.push({
    //Events with highest % of assistance
    highAssistance,
    //Events with lowest % of assistance
    lowestAssistance,
    //Events with larger capacity
    capacity
  })
}

//Filtrado de eventos por fecha anterior a la actual
function eventsFilterPast(parameterArray, date){
  for (let event of parameterArray){
      if(event.date < date){
          past.push(event)
      }
  }
}

//Filtrado de eventos por fecha futura a la actual
function eventsFilterFuture(parameterArray, date){
  for (let event of parameterArray){
      if(event.date > date){
          future.push(event)
      }
  }
}

let eventRevenue = []
let eventCats = []
let eventAssistance = []
let calculations = []

//Funcion para calcular las revenues y porcentaje de asistencia a las categorias
function getRevenue(catArray, eventArray){
  calculations = []
  //recorro el array de categorias
  catArray.forEach((category) => {
    eventCats = eventArray.filter((event) => category == event.category)
    eventRevenue = eventCats.reduce((i, event) => i + (event.price * (event.estimate || event.assistance)), 0)
    eventAssistance = eventCats.reduce((i, event) => i + (((event.assistance || event.estimate) / event.capacity) * 100), 0)
      calculations.push({
        category,
        eventRevenue,
        eventAssistance: eventAssistance / eventCats.length,
    })
  })
}

//funcion para asignar estructuras a cada resultado del array
let templateTable = ''
function asignStructure(array){
  for(let calc of array){
    templateTable += `<tr>
      <td>${calc.category}</td>
      <td>${calc.eventRevenue}</td>
      <td>${calc.eventAssistance}</td>
    </tr>`
  return templateTable
}}

let templateFirstTable = ''
function asignFirstStructure(array){
    templateFirstTable += `<tr>
      <td>${highAssistance}</td>
      <td>${lowestAssistance}</td>
      <td>${capacity}</td>
    </tr>`
  return templateTable
}

let firstTable = document.getElementById('eventStats');
firstTable.innerHTML = templateTable;

let secondTable = document.getElementById('upcomingStats');
secondTable.innerHTML = templateTable;

let thirdTable = document.getElementById('pastStats');
thirdTable.innerHTML = templateTable;

//funcion para crear tablas
function createTable(objData){
  let templateTable = ''
  templateTable += `<tr>
  <td>${objData.category}</td>
  <td>$${objData.eventRevenue}</td>
  <td>${objData.eventAssistance}%</td>
</tr>`

  return templateTable
}

//funcion para crear tablas
function createFirstTable(objData){
  let templateFirstTable = ''
  templateFirstTable += `<tr>
  <td>${objData.highAssistance[0]} ${objData.highAssistance[1]}%</td>
  <td>${objData.lowestAssistance[0]} ${objData.lowestAssistance[1]}%</td>
  <td>${objData.capacity[0]} ${objData.capacity[1]}</td>
</tr>`

  return templateFirstTable
}

const $firstTableContainer = document.getElementById('eventStats')
const $secondTableContainer = document.getElementById('upcomingStats')
const $thirdTableContainer = document.getElementById('pastStats')

//Funcion para imprimir las tablas pasandoles un array y el elementoHTML donde deben ir.
function printTables(array, HTMLelement){
  let structure = ''
  array.forEach(string => {
      structure += createTable(string)
  })
  HTMLelement.innerHTML = structure
}

function printFirstTable(array, HTMLelement){
  let structure = ''
  array.forEach(string => {
      structure += createFirstTable(string)
  })
  HTMLelement.innerHTML = structure
}