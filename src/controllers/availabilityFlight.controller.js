import ListFlights from "../classes/listFlight";
import moment from 'moment';
moment().format();

const AvailabilityFlight = {
    loadView() {
        const divElement = document.createElement('div');
        if (sessionStorage.getItem("search-flight")) {
            const availability = JSON.parse(sessionStorage.getItem("search-flight"));
            console.log(availability);

            let listFlight = new ListFlights();
            listFlight._listFlight = listFlight.getListFlight();
            let list = listFlight._listFlight;

            const result = list.find(flight => flight.state.id === 2 && flight.cityOrigin === availability.cityOrigin && flight.cityDestiny === availability.cityDestiny && flight.date === availability.date); 

            if (result) {
                const t = moment(`${result.date} ${result.time}`);
                t.add(1, 'hours');
                console.log(t.format('YYYY-MM-DD HH:mm'));
                divElement.innerHTML =
                    `<div class="m-5 shadow p-3 mb-5 bg-body-tertiary rounded">
                        <h5><i class="fa-solid fa-plane px-2"></i>Salida de ${availability.cityOrigin} a ${availability.cityDestiny} - ${availability.date}</h5>
                        <div class="row mt-5">
                            <div class="card w-75 m-5">
                                <div class="card-body ">
                                    <div class="d-flex justify-content-between">
                                        <h5>${result.time}</h5>
                                        <hr class="w-25 justify-self-start"/>
                                        <i class="fa-solid fa-plane-departure"></i>
                                        <hr class="w-25 justify-self-start"/>    
                                        <h5>${t.format('HH:mm')}</h5>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <p>${result.cityOrigin}</p>
                                        </div>
                                        <div>
                                            <p>${result.cityDestiny}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>`    
                            
            }
            else {
                divElement.innerHTML =
                `<div class="m-5 shadow p-3 mb-5 bg-body-tertiary rounded">
                    <h5>Lo sentimos no se econtraron resultados para tu busqueda</h5>
                </div>`
            }
            console.log(result);
            
        }

        return divElement;
    }
}

export { AvailabilityFlight };