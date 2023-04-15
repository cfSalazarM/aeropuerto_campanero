import views from "../views/admin-Hangar.html";
import { Hangar } from "../classes/hangar";
import ListHangares from "../classes/listHangares";
import { msj } from "../utilities/messages";
import { validations } from "../utilities/validation";

const AdminHangar = {
    loadView() {

        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {
        let listHangares = new ListHangares();
        listHangares._listHangar = listHangares.getListHangar();
        let list = listHangares._listHangar;

        for (let index = 0; index < list.length; index++) {
            let tbody = document.getElementById('tbody');
            let fila = document.createElement('tr');

            let celdaCode = document.createElement('td');
            let celdaCapacity = document.createElement('td');
            let celdaLocation = document.createElement('td');
            let celdaEditDelete = document.createElement('td');

            let nodoTextCode = document.createTextNode(list[index].code);
            let nodoTextCapacity = document.createTextNode(list[index].capacity);
            let nodoTextLocation = document.createTextNode(list[index].location);

            celdaCode.appendChild(nodoTextCode);
            celdaCapacity.appendChild(nodoTextCapacity);
            celdaLocation.appendChild(nodoTextLocation)

            fila.appendChild(celdaCode);
            fila.appendChild(celdaCapacity);
            fila.appendChild(celdaLocation);

            celdaEditDelete.innerHTML = '<a href="#editHangarModal" class="edit" data-bs-toggle="modal" data-bs-code="' + list[index].code + '" id="aEditHangar"><i class="fa-solid fa-pencil" data-toggle="tooltip" title="Editar" style="font-size: 22px; margin: 0 5px;"></i></a>' +
                '<a href="#deleteHangarModal" class="delete" data-bs-toggle="modal" data-bs-code="' + list[index].code + '"><i class="fa-solid fa-trash-can" data-toggle="tooltip" title="Eliminar" style="font-size: 22px; margin: 0 5px;"></i></a>';
            fila.appendChild(celdaEditDelete);

            tbody.appendChild(fila);
        }

        msj.showMsj();

        const butAddHangar = document.getElementById('bAddHangar');
        butAddHangar.addEventListener('click', () => {

            const code = document.getElementById('inputCode').value;
            const capacity = document.getElementById('inputCapacity').value;
            const location = document.getElementById('inputLocation').value;
            let fields = [code, capacity, location];
            let pass = validations.fieldEmpty(fields);
            let passNumber = validations.isNumber(fields, ['codigo', 'capacidad', 'ubicación']);
            if (!pass) {
                msj.fieldsOk(pass);
            }
            else if(!passNumber.flag) {
                msj.numberOk(passNumber);
            }
            else {
                let hangar = new Hangar(code, capacity, location);
                listHangares.addHangar(hangar);
                msj.RegisterOk();
            }
        });

        const editModal = document.getElementById('editHangarModal');
        const deleteModal = document.getElementById('deleteHangarModal');

        editModal.addEventListener('shown.bs.modal', event => {
            const code = getCode(event);
            document.getElementById('codeHangar').value = code;
        });

        deleteModal.addEventListener('shown.bs.modal', event => {
            const code = getCode(event);
            document.getElementById('codeHangar').value = code;
        });

        let formEdit = document.getElementById('form-EditHangar');
        formEdit.addEventListener('submit', evt => {
            evt.preventDefault();

            let code = document.getElementById('codeHangar').value;
            let capacity = document.getElementById('inputCapacityEdit').value;
            let location = document.getElementById('inputLocationEdit').value

            let fields = [code, capacity, location];
            let passNumber = validations.isNumber(fields, ['codigo', 'capacidad', 'ubicación']);

            let pass = validations.fieldEmpty(fields);
            if (!pass) {
                msj.fieldsOk(pass);
            }
            else if(!passNumber.flag) {
                msj.numberOk(passNumber);
            }
            else {
                listHangares.editHangar(code, capacity, location);
                msj.UpdateOk();
            }

        });

        let formDelete = document.getElementById('form-DeleteHangar');

        formDelete.addEventListener('submit', evt => {
            evt.preventDefault();
            listHangares.deleteHangar(document.getElementById('codeHangar').value);

            msj.DeleteOk();
        });

        let formAllDelete = document.getElementById('form-DeleteHangares');

        formAllDelete.addEventListener('submit', evt => {
            evt.preventDefault();
            listHangares.deleteAllHangares();

            msj.DeleteAllOk();
        })

        function getCode(event) {
            let selection = event.relatedTarget;
            let code = selection.getAttribute('data-bs-code');

            return code;
        }
    }
}

export { AdminHangar };
