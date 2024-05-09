// il mio backender mi ha detto che un evento è un oggetto dotato di queste proprietà:
// name -> string
// description -> string
// price -> number | string
// time -> string (Date)

// occupiamoci di recuperare i dati del form nell'evento di submit
// e inviare una richiesta al backend per salvare il nostro nuovo concerto!

class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

const submitEvent = function (e) {
  e.preventDefault()
  // recuperiamo dei riferimenti agli input del form
  const nameInput = document.getElementById('name') // input field del campo name
  const descriptionInput = document.getElementById('description') // input field del campo description
  const priceInput = document.getElementById('price') // input field del campo price
  const timeInput = document.getElementById('time') // input field del campo time

  const concertFromForm = new Concert(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,
    timeInput.value
  )

  console.log('CONCERTO DA INVIARE ALLE API', concertFromForm)

  // ora inviamo questo concerto alle API per salvarlo permanentemente in DB
  // dovremo inviare una REQUEST (fetch) però con method 'POST' (NON GET!)

  // l'indirizzo sul quale opererete la POST (se utilizzate delle API RESTful) è IDENTICO all'indirizzo su cui
  // operereste la GET
  fetch('https://striveschool-api.herokuapp.com/api/agenda', {
    // questo oggetto va indicato qualora l'operazione NON sia la default
    // già il fatto che opereremo una POST e non una GET fa in modo che questo secondo parametro vada dichiarato
    method: 'POST',
    body: JSON.stringify(concertFromForm), // il body in una request è SEMPRE UNA STRINGA
    headers: {
      'Content-type': 'application/json', // informiamo le API che (anche se in formato stringa) stiamo inviando un OGGETTO
      // se avessimo un'API protetta, in questo oggetto headers ci andrebbe anche l'autenticazione:
      // Authorization: 'Bearer xxxxxxxxx'
    },
  })
}

document.getElementById('event-form').addEventListener('submit', submitEvent)
