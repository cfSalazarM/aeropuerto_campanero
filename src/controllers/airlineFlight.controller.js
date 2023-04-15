import views from "../views/airline-flight.html";
import { msj } from "../utilities/messages";
import { validations } from "../utilities/validation";
import ListUsers from "../classes/listUsers";
import ListPlanes from "../classes/listAviones";
import cities from "../utilities/cities.json";
import ListFlights from "../classes/listFlight";
import { Flight } from "../classes/flight";
import stateFlight from "../utilities/stateFlight.json"
import closeSession from "../utilities/closeSession";
import sidebar from "../utilities/sidebar";

const AirlineFlight = {
    loadView() {

        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {
        sidebar.openCloseNav();
        let listFlights = new ListFlights();
        listFlights._listFlight = listFlights.getListFlight();

        let listUsers = new ListUsers();
        listUsers._listUsers = listUsers.getListUsers();

        let listPlanes = new ListPlanes();
        listPlanes._listPlane = listPlanes.getListPlane();

        let list = listFlights._listFlight;

        for (let index = 0; index < list.length; index++) {
            console.log('pase')
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

            if (list[index].state.id != 2) {
                celdaEditDelete.innerHTML = '<a href="#editFlightModal" class="edit" data-bs-toggle="modal" data-bs-id="' + list[index].code + '" id="aEditPilot"><i class="fa-solid fa-pencil" data-toggle="tooltip" title="Editar" style="font-size: 22px; margin: 0 5px;"></i></a>';

                fila.appendChild(celdaEditDelete);
            }

            tbody.appendChild(fila);
        }


        msj.showMsj();

        const modalAdd = document.getElementById('addFlightModal');
        let selectPilot = document.getElementById('s-pilot');
        let selectPlane = document.getElementById('s-plane');
        let selectCO = document.getElementById('s-city');
        let selectCD = document.getElementById('s-cityDestiny');

        modalAdd.addEventListener('shown.bs.modal', () => {

            cleanSelect(selectPilot);
            cleanSelect(selectPlane);
            cleanSelect(selectCO);
            cleanSelect(selectCD);

            let listPilot = listUsers.getListByType('pilot');
            let listPlane = new ListPlanes();
            listPlane._listPlane = listPlane.getListPlane();

            listPilot.forEach(pilot => {
                const option = document.createElement('option');
                option.value = pilot.user;
                option.text = `${pilot.user} - ${pilot.nameUser}`;
                selectPilot.appendChild(option);
            });

            listPlane._listPlane.forEach(plane => {
                const option = document.createElement('option');
                option.value = plane.id;
                option.text = `${plane.id} - ${plane.model} - ${plane.capacity} Pasajeros`;
                selectPlane.appendChild(option);
            })

            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.name;
                option.text = city.name;
                selectCO.appendChild(option);
            });

            let indice = selectCO.selectedIndex;
            let opcionSeleccionada = selectCO.options[indice].value;

            cities.forEach(city => {
                const option = document.createElement('option');
                if (city.name != opcionSeleccionada) {
                    option.value = city.name;
                    option.text = city.name;
                    selectCD.appendChild(option);
                }
            });

            selectCO.addEventListener('change', () => {
                cleanSelect(selectCD);
                indice = selectCO.selectedIndex;
                opcionSeleccionada = selectCO.options[indice].value;
                console.log(opcionSeleccionada);

                cities.forEach(city => {
                    const option = document.createElement('option');
                    if (city.name != opcionSeleccionada) {
                        option.value = city.name;
                        option.text = city.name;
                        selectCD.appendChild(option);
                    }

                });
            })

        });


        const butAddFlight = document.getElementById('bAddFlight');
        butAddFlight.addEventListener('click', () => {
            const code = document.getElementById('inputId').value;

            const indicePilot = selectPilot.selectedIndex;
            const spilot = selectPilot.options[indicePilot].value;
            const pilot = listUsers.getUserById(spilot);

            const indicePlane = selectPlane.selectedIndex;
            const splane = selectPlane.options[indicePlane].value;
            const plane = listPlanes.getPlane(splane);

            const indiceCO = selectCO.selectedIndex;
            const cityOrigin = selectCO.options[indiceCO].value;

            const indiceCD = selectCD.selectedIndex;
            const cityDestiny = selectCD.options[indiceCD].value;

            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            const airline = sessionStorage.getItem('session');

            let fields = [code, date, time];
            let pass = validations.fieldEmpty(fields);
            let passNumber = validations.isNumber(fields, ['Código de vuelo', 'Fecha', 'Hora']);

            if (!pass) {
                msj.fieldsOk(pass);
            }
            else if (!passNumber) {
                msj.numberOk(passNumber);
            }
            else {
                const flight = new Flight(code, plane, pilot, cityOrigin, cityDestiny, date, time, stateFlight.at(0), JSON.parse(airline));
                listFlights.addFlight(flight);
                msj.RegisterOk();
            }

        });

        const btnCloseSession = document.getElementById('close-session');
        btnCloseSession.addEventListener('submit', evt => {
            evt.preventDefault();
            closeSession();
        });

        function cleanSelect(select) {

            for (let i = select.options.length; i >= 0; i--) {
                select.remove(i);
            }
        }

    }
}

export { AirlineFlight };