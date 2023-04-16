import views from "../views/airline-plane.html";
import { msj } from "../utilities/messages";
import { validations } from "../utilities/validation";
import {Plane} from "../classes/avion";
import ListPlanes from "../classes/listAviones";
import closeSession from "../utilities/closeSession";
import sidebar from "../utilities/sidebar";

const AirlinePlane = {
    loadView() {

        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {
        sidebar.openCloseNav();
        let listPlanes = new ListPlanes();
        listPlanes._listPlane = listPlanes.getListPlane();
        let list = listPlanes._listPlane;

        for (let index = 0; index < list.length; index++) {
            let tbody = document.getElementById('tbody');
            let fila = document.createElement('tr');

            let celdaId = document.createElement('td');
            let celdaModel = document.createElement('td');
            let celdaCapacity = document.createElement('td');
            let celdaEditDelete = document.createElement('td');

            let nodoTextId = document.createTextNode(list[index].id);
            let nodoTextModel = document.createTextNode(list[index].model);
            let nodoTextCapacity = document.createTextNode(list[index].capacity);

            celdaId.appendChild(nodoTextId);
            celdaModel.appendChild(nodoTextModel);
            celdaCapacity.appendChild(nodoTextCapacity);

            fila.appendChild(celdaId);
            fila.appendChild(celdaModel);
            fila.appendChild(celdaCapacity);

            celdaEditDelete.innerHTML = '<a href="#editPlaneModal" class="edit" data-bs-toggle="modal" data-bs-id="' + list[index].id + '" id="aEditPlane"><i class="fa-solid fa-pencil" data-toggle="tooltip" title="Editar" style="font-size: 22px; margin: 0 5px;"></i></a>' +
                '<a href="#deletePlaneModal" class="delete" data-bs-toggle="modal" data-bs-id="' + list[index].id + '"><i class="fa-solid fa-trash-can" data-toggle="tooltip" title="Eliminar" style="font-size: 22px; margin: 0 5px;"></i></a>';
            fila.appendChild(celdaEditDelete);

            tbody.appendChild(fila);
        }

        msj.showMsj();

        const butAddPlane = document.getElementById('bAddPlane');
        butAddPlane.addEventListener('click', () => {

            const id = document.getElementById('inputId').value;
            const model = document.getElementById('inputModel').value;
            const capacity = document.getElementById('inputCapacity').value;
            let fields = [id, model, capacity];
            let pass = validations.fieldEmpty(fields);
            let passNumber = validations.isNumber([capacity], ['Capacidad']);
            if (!pass) {
                msj.fieldsOk(pass);
            }
            else if(!passNumber.flag) {
                msj.numberOk(passNumber);
            }
            else if (listPlanes.checkId(id)) {
                msj.idExist();
            }
            else {
                let plane = new Plane(id, model, capacity);
                listPlanes.addPlane(plane);
                msj.RegisterOk();
            }
        });

        const editModal = document.getElementById('editPlaneModal');
        const deleteModal = document.getElementById('deletePlaneModal');

        editModal.addEventListener('shown.bs.modal', event => {
            const id = getId(event);
            document.getElementById('id').value = id;
        });

        deleteModal.addEventListener('shown.bs.modal', event => {
            const id = getId(event);
            document.getElementById('idDelete').value = id;
        });

        let formEdit = document.getElementById('form-EditPlane');
        formEdit.addEventListener('submit', evt => {
            evt.preventDefault();

            let id = document.getElementById('id').value;
            let model = document.getElementById('inputModelEdit').value
            let capacity = document.getElementById('inputCapacityEdit').value;

            let fields = [id, model, capacity];
            let passNumber = validations.isNumber([capacity], ['Capacidad']);

            let pass = validations.fieldEmpty(fields);
            if (!pass) {
                msj.fieldsOk(pass);
            }
            else if(!passNumber.flag) {
                msj.numberOk(passNumber);
            }
            else {
                listPlanes.editPlane(id, model, capacity);
                msj.UpdateOk();
            }

        });

        let formDelete = document.getElementById('form-DeletePlane');

        formDelete.addEventListener('submit', evt => {
            evt.preventDefault();
            listPlanes.deletePlane(document.getElementById('idDelete').value);

            msj.DeleteOk();
        });

        let formAllDelete = document.getElementById('form-DeletePlanes');

        formAllDelete.addEventListener('submit', evt => {
            evt.preventDefault();
            listPlanes.deleteAllPlanes();

            msj.DeleteAllOk();
        });

        const butCloseSession = document.getElementById('close-session');
        butCloseSession.addEventListener('submit', evt => {
            evt.preventDefault();
            closeSession();
        });

        function getId(event) {
            let selection = event.relatedTarget;
            let id = selection.getAttribute('data-bs-id');

            return id;
        }
    }
}

export {AirlinePlane};