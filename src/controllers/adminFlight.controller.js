import views from "../views/admin-flight.html";
import { msj } from "../utilities/messages";
import ListFlights from "../classes/listFlight";
import stateFlight from "../utilities/stateFlight.json"

const AdminFlight = {
    loadView() {
        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {
        let listFlights = new ListFlights();
        listFlights._listFlight = listFlights.getListFlight();

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
            let celdaSchedule = document.createElement('td');

            let nodoTextId = document.createTextNode(list[index].code);
            let nodoTextPlane = document.createTextNode(list[index].plane.id);
            let nodoTextPilot = document.createTextNode(`${list[index].pilot.user} - ${list[index].pilot.nameUser}`);
            let nodoTextCO = document.createTextNode(list[index].cityOrigin);
            let nodoTextCD = document.createTextNode(list[index].cityDestiny);
            let nodoTextDate = document.createTextNode(list[index].date);
            let nodoTextTime = document.createTextNode(list[index].time);
            let nodoTextState = document.createTextNode(list[index].state.description);

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

            if (list[index].state.id === 1) {
                celdaSchedule.innerHTML = '<button class="btn btn-success mb-1" data-bs-target="#scheduledFlightModal" data-bs-toggle="modal" data-bs-id="' + list[index].code + '" id="aEditPilot"  data-toggle="tooltip" title="Agendar Vuelo"><i class="fa-solid fa-calendar-check"></i></button>' +
                    '<button class="btn btn-danger" data-bs-target="#rejectFlightModal" data-bs-toggle="modal" data-bs-id="' + list[index].code + '" id="aEditPilot"  data-toggle="tooltip" title="Rechazar Solicitud"><i class="fa-solid fa-calendar-xmark"></i></button>';

                fila.appendChild(celdaSchedule);
            }

            tbody.appendChild(fila);
        }

        msj.showMsjToast();

        const scheduledModal = document.getElementById('scheduledFlightModal');
        const rejectModal = document.getElementById('rejectFlightModal');

        scheduledModal.addEventListener('shown.bs.modal', evt => {
            const code = getCode(evt);
            document.getElementById('code').value = code;
        });

        rejectModal.addEventListener('shown.bs.modal', evt => {
            const code = getCode(evt);
            document.getElementById('codeReject').value = code;
        });

        const formScheduled = document.getElementById('form-scheduledFlight');
        const formReject = document.getElementById('form-rejectFlight');

        formScheduled.addEventListener('submit', event => {
            event.preventDefault();

            let code = document.getElementById('code').value;

            listFlights.updateState(code, stateFlight.at(1));

            msj.FlightScheduled();
        })

        formReject.addEventListener('submit', event => {
            event.preventDefault();

            let code = document.getElementById('code').value;

            listFlights.updateState(code, stateFlight.at(2));

            msj.FlightScheduled();
        })

        function getCode(event) {
            let selection = event.relatedTarget;
            let code = selection.getAttribute('data-bs-id');

            return code;
        }
    }
}

export { AdminFlight };