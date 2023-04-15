import views from "../views/airline-pilot.html"
import { msj } from "../utilities/messages";
import ListUsers from "../classes/listUsers";
import { User } from "../classes/user";
import { validations } from "../utilities/validation";
import closeSession from "../utilities/closeSession";

const AirlinePilot = {
    loadView() {

        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {
        let listUsers = new ListUsers();
        listUsers._listUsers = listUsers.getListUsers();
        let list = listUsers.getListByType('pilot');

        for (let index = 0; index < list.length; index++) {
            let tbody = document.getElementById('tbody');
            let fila = document.createElement('tr');

            let celdaId = document.createElement('td');
            let celdaNombre = document.createElement('td');
            let celdaTelefono = document.createElement('td');
            let celdaEditDelete = document.createElement('td');
            let celdaPassword = document.createElement('td');

            let nodoTextId = document.createTextNode(list[index].user);
            let nodoTextNombre = document.createTextNode(list[index].nameUser);
            let nodoTextTelefono = document.createTextNode(list[index].phone);
            let nodoPassword = document.createTextNode(list[index].password);

            celdaId.appendChild(nodoTextId);
            celdaNombre.appendChild(nodoTextNombre);
            celdaTelefono.appendChild(nodoTextTelefono)
            celdaPassword.appendChild(nodoPassword);

            fila.appendChild(celdaId);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaTelefono);
            fila.appendChild(celdaPassword);

            celdaEditDelete.innerHTML = '<a href="#editPilotModal" class="edit" data-bs-toggle="modal" data-bs-id="' + list[index].user + '" id="aEditPilot"><i class="fa-solid fa-pencil" data-toggle="tooltip" title="Editar" style="font-size: 22px; margin: 0 5px;"></i></a>' +
                '<a href="#deletePilotModal" class="delete" data-bs-toggle="modal" data-bs-id="' + list[index].user + '"><i class="fa-solid fa-trash-can" data-toggle="tooltip" title="Eliminar" style="font-size: 22px; margin: 0 5px;"></i></a>';
            fila.appendChild(celdaEditDelete);

            tbody.appendChild(fila);
        }

        msj.showMsj();

        const butAddPilot = document.getElementById('bAddPilot');
        butAddPilot.addEventListener('click', () => {

            const id = document.getElementById('inputId').value;
            const nombre = document.getElementById('inputName').value;
            const telefono = document.getElementById('inputPhone').value;
            const password = document.getElementById('inputPassword').value;
            let fields = [id, nombre, telefono, password];
            let pass = validations.fieldEmpty(fields);
            let passNumber = validations.isNumber([id, telefono], ['Identificación', 'Telefono']);
            if (!pass) {
                msj.fieldsOk(pass);
            }
            else if (!passNumber.flag) {
                msj.numberOk(passNumber);
            }
            else {
                let pilot = new User(id, nombre, telefono, "pilot", password);
                listUsers.addUser(pilot);
                msj.RegisterOk();
            }
        });

        const editModal = document.getElementById('editPilotModal');
        const deleteModal = document.getElementById('deletePilotModal');

        editModal.addEventListener('shown.bs.modal', event => {
            const id = getId(event);
            document.getElementById('id').value = id;
        });

        deleteModal.addEventListener('shown.bs.modal', event => {
            const id = getId(event);
            document.getElementById('idDelete').value = id;
        });

        let formEdit = document.getElementById('form-EditPilot');
        formEdit.addEventListener('submit', evt => {
            evt.preventDefault();

            let id = document.getElementById('id').value;
            let name = document.getElementById('inputNameEdit').value;
            let phone = document.getElementById('inputPhoneEdit').value
            let password = document.getElementById('inputPasswordEdit').value;

            let fields = [id, name, phone, password];
            let passNumber = validations.isNumber([id, phone], ['Identificación', 'Telefono']);

            let pass = validations.fieldEmpty(fields);
            if (!pass) {
                msj.fieldsOk(pass);
            }
            else if (!passNumber.flag) {
                msj.numberOk(passNumber);
            }
            else {
                listUsers.editUser(id, name, phone, password);

                msj.UpdateOk();
            }

        });

        let formDelete = document.getElementById('form-DeletePilot');

        formDelete.addEventListener('submit', evt => {
            evt.preventDefault();
            listUsers.deleteUser(document.getElementById('idDelete').value);

            msj.DeleteOk();
        });

        let formAllDelete = document.getElementById('form-DeletePilots');

        formAllDelete.addEventListener('submit', evt => {
            evt.preventDefault();
            listUsers.deleteAllUsers("pilot");

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

export {AirlinePilot};