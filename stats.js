
function getAPI(){ 
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((response) => response.json())
    .then(data => {
    eventData = data.events
    currentDate = data.currentDate
  })
}

  async function FillSecondTable(){
    await getAPI()
    
  }