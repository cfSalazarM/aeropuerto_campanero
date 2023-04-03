import { pages } from "../controllers/index";
import Swal from 'sweetalert2'
import Aerolinea from "../classes/Aerolinea";
import ListAerolinea from "../classes/listAerolineas";
import { User } from "../classes/user";
import ListUsers from "../classes/listUsers";
import { msj } from "../../utilities/messages";

let content = document.getElementById('root');

const router = (route) => {
    switch (route) {
        case '#/':
            return console.log('home');
        case '#/infoVuelos':
            return console.log('infoVuelos');
        case '#/aerolineas':
            return console.log('aerolineas');
        case '#/sobreNosotros':
            return console.log('sobreNosotros');
        case '#/login': {
            content.innerHTML = '';
            content.appendChild(pages.login());

            msj.showMsj();

            const button = document.getElementById('bLog');
            button.addEventListener('click', () => {
                const user = document.getElementById("floatingInput").value;
                const password = document.getElementById('floatingPassword').value;

                let listUsers = new ListUsers();
                listUsers._listUsers = listUsers.getListUsers();
                
                let flag = listUsers.authUser(user, password);
                msj.Login0k(flag, "#/admin-Airline");
                    
            });
            return console.log('login');
        };
        case '#/registro':
            content.innerHTML = '';
            content.appendChild(pages.register());

            let listUsers = new ListUsers();
            listUsers._listUsers = listUsers.getListUsers();

            msj.issetAdmin(listUsers.issetAdmin());

            if (sessionStorage.getItem("msj")) {
                Swal.fire(
                    `${sessionStorage.getItem("hmsj")}`,
                    `${sessionStorage.getItem("msj")}`,
                    `${sessionStorage.getItem("typeMsj")}`
                );

                sessionStorage.removeItem("hmsj");
                sessionStorage.removeItem("msj");
                sessionStorage.removeItem("typeMsj");
            }
            
            const formRegister = document.getElementById('form-addUser');

            formRegister.addEventListener('submit', evt=>{
                evt.preventDefault();
                let userName = document.getElementById('user').value;
                console.log(userName);
                let name = document.getElementById('name').value;
                let phone = document.getElementById('phone').value;
                let password = document.getElementById('password').value;
                let typeUser = listUsers.issetAdmin() == true ? "client" : "admin";
                let user = new User(userName, name, phone, typeUser, password); 
                listUsers.addUser(user);
                msj.RegisterOk();
            })


            return console.log('registro');
        case '#/admin-Airline': {
            content.innerHTML = '';
            content.appendChild(pages.AdminAirline());

            let listUsers = new ListUsers();
            listUsers._listUsers = listUsers.getListUsers();
            let list = listUsers.getListByType('airline');

            for (let index = 0; index < list.length; index++) {
                let tbody = document.getElementById('tbody');
                let fila = document.createElement('tr');

                let celdaNit = document.createElement('td');
                celdaNit.setAttribute('class', 'nit')
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
            if (sessionStorage.getItem("msj")) {
                Swal.fire(
                    `${sessionStorage.getItem("hmsj")}`,
                    `${sessionStorage.getItem("msj")}`,
                    `${sessionStorage.getItem("typeMsj")}`
                );

                sessionStorage.removeItem("hmsj");
                sessionStorage.removeItem("msj");
                sessionStorage.removeItem("typeMsj");

            }

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
                    sessionStorage.setItem("hmsj", "Aviso");
                    sessionStorage.setItem("msj", "Registro exitoso");
                    sessionStorage.setItem("typeMsj", "success");
                    window.location.reload();
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
                listUsers.editAerolinea(document.getElementById('oldNit').value, document.getElementById('inputNombreEdit').value, document.getElementById('inputTelefonoEdit').value);
                sessionStorage.setItem("hmsj", "Aviso");
                sessionStorage.setItem("msj", "El registro se actualizó correctamente");
                sessionStorage.setItem("typeMsj", "success");
                window.location.reload();
            });

            let formDelete = document.getElementById('form-DeleteAero');

            formDelete.addEventListener('submit', evt => {
                evt.preventDefault();
                listUsers.deleteAerolinea(document.getElementById('nitDelete').value);
                sessionStorage.setItem("hmsj", "Aviso");
                sessionStorage.setItem("msj", "El registro se eliminó correctamente");
                sessionStorage.setItem("typeMsj", "success");
                window.location.reload();
            });

            let formAllDelete = document.getElementById('form-DeleteAeros');

            formAllDelete.addEventListener('submit', evt => {
                evt.preventDefault();
                listUsers.deleteAllAerolineas();
                sessionStorage.setItem("hmsj", "Aviso");
                sessionStorage.setItem("msj", "Todos los registros se han eliminado correctamente");
                sessionStorage.setItem("typeMsj", "success");
                window.location.reload();
            })

            return console.log('admin');
        };

        default: {
            if (window.location.href == 'http://localhost:8080/') {
                content.innerHTML = '';
                content.appendChild(pages.home());
            };
            return console.log('404!!!');
        }
    }



}

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

export { router };