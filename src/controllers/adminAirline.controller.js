import views from "../views/admin-airline.html";
import { User } from "../classes/user";
import ListUsers from "../classes/listUsers";
import { msj } from "../../utilities/messages";


const AdminAirline = {
    loadView() {

        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {
        let listUsers = new ListUsers();
        listUsers._listUsers = listUsers.getListUsers();
        let list = listUsers.getListByType('airline');

        for (let index = 0; index < list.length; index++) {
            let tbody = document.getElementById('tbody');
            let fila = document.createElement('tr');

            let celdaNit = document.createElement('td');
            let celdaNombre = document.createElement('td');
            let celdaTelefono = document.createElement('td');
            let celdaEditDelete = document.createElement('td');
            let celdaPassword = document.createElement('td');


            let nodoTextNit = document.createTextNode(list[index].user);
            let nodoTextNombre = document.createTextNode(list[index].nameUser);
            let nodoTextTelefono = document.createTextNode(list[index].phone);
            let nodoPassword = document.createTextNode(list[index].password);

            celdaNit.appendChild(nodoTextNit);
            celdaNombre.appendChild(nodoTextNombre);
            celdaTelefono.appendChild(nodoTextTelefono)
            celdaPassword.appendChild(nodoPassword);

            fila.appendChild(celdaNit);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaTelefono);
            fila.appendChild(celdaPassword);

            celdaEditDelete.innerHTML = '<a href="#editAerolineaModal" class="edit" data-bs-toggle="modal" data-bs-nit="' + list[index].user + '" id="aEditAero"><i class="fa-solid fa-pencil" data-toggle="tooltip" title="Editar" style="font-size: 22px; margin: 0 5px;"></i></a>' +
                '<a href="#deleteAerolineaModal" class="delete" data-bs-toggle="modal" data-bs-nit="' + list[index].user + '"><i class="fa-solid fa-trash-can" data-toggle="tooltip" title="Eliminar" style="font-size: 22px; margin: 0 5px;"></i></a>';
            fila.appendChild(celdaEditDelete);

            tbody.appendChild(fila);
        }

        msj.showMsj();

        const butAddAero = document.getElementById('bAddAerolinea');
        butAddAero.addEventListener('click', () => {
            let ban
            let forms = document.querySelectorAll('.needs-validation');
            validate();

            const nit = document.getElementById('inputNit').value;
            const nombre = document.getElementById('inputNombre').value;
            const telefono = document.getElementById('inputTelefono').value;
            const password = document.getElementById('inputPassword').value;

            forms.forEach(form => {
                ban = form.checkValidity();
            })

            if (ban == true) {

                let aerolinea = new User(nit, nombre, telefono, "airline", password);
                listUsers.addUser(aerolinea);
                msj.RegisterOk();
            }
        });

        const editModal = document.getElementById('editAerolineaModal');
        const deleteModal = document.getElementById('deleteAerolineaModal');

        editModal.addEventListener('shown.bs.modal', event => {
            const nit = getNit(event);
            document.getElementById('oldNit').value = nit;
        });

        deleteModal.addEventListener('shown.bs.modal', event => {
            const nit = getNit(event);
            document.getElementById('nitDelete').value = nit;
        });

        let formEdit = document.getElementById('form-EditAero');
        formEdit.addEventListener('submit', evt => {
            evt.preventDefault();

            let nit = document.getElementById('oldNit').value;
            let name = document.getElementById('inputNombreEdit').value;
            let phone = document.getElementById('inputTelefonoEdit').value
            let password = document.getElementById('inputPasswordEdit').value;

            listUsers.editUser(nit, name, phone, password);

            msj.UpdateOk();
        });

        let formDelete = document.getElementById('form-DeleteAero');

        formDelete.addEventListener('submit', evt => {
            evt.preventDefault();
            listUsers.deleteUser(document.getElementById('nitDelete').value);

            msj.DeleteOk();
        });

        let formAllDelete = document.getElementById('form-DeleteAeros');

        formAllDelete.addEventListener('submit', evt => {
            evt.preventDefault();
            listUsers.deleteAllUsers("airline");

            msj.DeleteAllOk();
        })

        function validate() {
            // Example starter JavaScript for disabling form submissions if there are invalid fields
            var ban = true
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    },
                        false)

                })
        }

        function getNit(event) {
            let selection = event.relatedTarget;
            let nit = selection.getAttribute('data-bs-nit');

            return nit;
        }
    }
}

export { AdminAirline };
