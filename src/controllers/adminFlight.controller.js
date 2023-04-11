import views from "../views/admin-flight.html";
import { msj } from "../utilities/messages";
import { validations } from "../utilities/validation";
import ListFlights from "../classes/listFlight";

const AdminFlight = {
    loadView() {
        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {
        let listFlights = new ListFlights();
        listFlights._listFlight  = listFlights.getListFlight();

        let list = listFlights._listFlight;

        for (let index = 0; index < list.length; index++) {
            let tbody = document.getElementById('tbody');
            let fila = document.createElement('tr');

            let celdaId = document.createElement('td');
            let celdaPlane = document.createElement('td');
            let celdaPilot = document.createElement('td');
            let celdaCO = document.createElement('td');
            let celdaCD = document.createElement('td');
            let celdadDate = document.createElement('td');
            let celdaTime = document.createElement('td');
            let celdaState = document.createElement('td');
            let celdaEditDelete = document.createElement('td');
            celdaEditDelete.setAttribute('class', '');

            let nodoTextId = document.createTextNode(list[index].code);
            let nodoTextPlane = document.createTextNode(list[index].plane.id);
            let nodoTextPilot = document.createTextNode(`${list[index].pilot.user} - ${list[index].pilot.nameUser}`);
            let nodoTextCO = document.createTextNode(list[index].cityOrigin);
            let nodoTextCD = document.createTextNode(list[index].cityDestiny);
            let nodoTextDate = document.createTextNode(list[index].date);
            let nodoTextTime = document.createTextNode(list[index].time);
            let nodoTextState = document.createTextNode(list[index].state);


            celdaId.appendChild(nodoTextId);
            celdaPlane.appendChild(nodoTextPlane);
            celdaPilot.appendChild(nodoTextPilot)
            celdaCO.appendChild(nodoTextCO);
            celdaCD.appendChild(nodoTextCD);
            celdadDate.appendChild(nodoTextDate);
            celdaTime.appendChild(nodoTextTime);
            celdaState.appendChild(nodoTextState);


            fila.appendChild(celdaId);
            fila.appendChild(celdaPlane);
            fila.appendChild(celdaPilot);
            fila.appendChild(celdaCO);
            fila.appendChild(celdaCD);
            fila.appendChild(celdadDate);
            fila.appendChild(celdaTime);
            fila.appendChild(celdaState);

            celdaEditDelete.innerHTML = '<button class="btn btn-success mb-1" data-bs-target="#scheduledFlightModal" data-bs-toggle="modal" data-bs-id="' + list[index].code + '" id="aEditPilot"  data-toggle="tooltip" title="Agendar Vuelo"><i class="fa-solid fa-calendar-check"></i></button>' +
            '<button class="btn btn-danger" data-bs-target="#rejectFlightModal" data-bs-toggle="modal" data-bs-id="' + list[index].code + '" id="aEditPilot"  data-toggle="tooltip" title="Rechazar Solicitud"><i class="fa-solid fa-calendar-xmark"></i></button>';
                
            fila.appendChild(celdaEditDelete);

            tbody.appendChild(fila);
        }
    }
}

export {AdminFlight};