import views from "../views/airline-flight.html";
import { msj } from "../utilities/messages";
import { validations } from "../utilities/validation";
import ListUsers from "../classes/listUsers";
import { User } from "../classes/user";
import ListPlanes from "../classes/listAviones";
import cities from "../utilities/cities.json"

const AirlineFlight = {
    loadView() {

        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {

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
            let listUsers = new ListUsers();
            listUsers._listUsers = listUsers.getListUsers();
            let listPilot = listUsers.getListByType('pilot');
            let listPlane = new ListPlanes();
            listPlane._listPlane = listPlane.getListPlane();

            listPilot.forEach(pilot => {
                const option = document.createElement('option');
                option.value = pilot.nameUser;
                option.text = `${pilot.user} - ${pilot.nameUser}`;
                selectPilot.appendChild(option);
            });

            listPlane._listPlane.forEach(plane => {
                const option = document.createElement('option');
                option.value = `${plane.id} - ${plane.model}`;
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
            console.log(opcionSeleccionada);

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
            console.log('click')


        });

        function cleanSelect(select) {

            for (let i = select.options.length; i >= 0; i--) {
                select.remove(i);
            }
        }

    }
}

export { AirlineFlight };