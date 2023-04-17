import ListFlights from "../classes/listFlight";
import moment from 'moment';
moment().format();

const AvailabilityFlight = {
    loadView() {
        let divElement = document.createElement('div');
        if (sessionStorage.getItem("search-flight")) {
            const availability = JSON.parse(sessionStorage.getItem("search-flight"));

            let listFlight = new ListFlights();
            listFlight._listFlight = listFlight.getListFlight();
            let list = listFlight._listFlight;

            const result = list.filter(flight => flight.state.id === 2 && flight.cityOrigin === availability.cityOrigin && flight.cityDestiny === availability.cityDestiny && flight.date === availability.date);

            if (result) {
                divElement.classList.add('m-5', 'shadow', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded');
                divElement.innerHTML =
                    `<h5><i class="fa-solid fa-plane px-2"></i>Salida de ${availability.cityOrigin} a ${availability.cityDestiny} - ${availability.date}</h5>`;
                
                let divCards = document.createElement('div');   
                divCards.classList.add('row', 'mt-5');       
                
                result.forEach(flight => {
                    const t = moment(`${flight.date} ${flight.time}`);
                    t.add(1, 'hours');

                    divCards.innerHTML +=
                        `<div class="card w-75 m-5">
                            <div class="card-body ">
                                <div class="d-flex justify-content-between">
                                    <h5>${flight.time}</h5>
                                    <hr class="w-25 justify-self-start"/>
                                    <i class="fa-solid fa-plane-departure"></i>
                                    <hr class="w-25 justify-self-start"/>    
                                    <h5>${t.format('HH:mm')}</h5>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <p>${flight.cityOrigin}</p>
                                    </div>
                                    <div>
                                        <p>${flight.cityDestiny}</p>
                                    </div>
                                </div>    
                            </div>
                        </div>`
                             
                });
                divElement.appendChild(divCards);

            }
            else {
                divElement.innerHTML =
                    `<div class="m-5 shadow p-3 mb-5 bg-body-tertiary rounded">
                    <h5>Lo sentimos, no se econtraron resultados para tu busqueda</h5>
                </div>`
            }

        }

        return divElement;
    }
}

export { AvailabilityFlight };