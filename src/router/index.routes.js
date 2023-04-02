import { pages } from "../controllers/index";
import Swal from 'sweetalert2'
import Aerolinea from "../classes/Aerolinea";
import ListAerolinea from "../classes/listAerolineas";


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

            const button = document.getElementById('bLog');
            button.addEventListener('click', () => {
                const textUser = document.getElementById("floatingInput").value;
                console.log(textUser);
                const textPassword = document.getElementById('floatingPassword').value;

                if (textUser == 'felipe@hotmail.com' && textPassword == '12345') {
                    Swal.fire(
                        'Aviso',
                        'Ingreso exitoso',
                        'success'
                    )
                    window.location.hash = "#/admin";
                }
            });
            return console.log('login');
        };
        case '#/registro':
            return console.log('registro');
        case '#/admin': {
            content.innerHTML = '';
            content.appendChild(pages.admin());

            let listAerolinea = new ListAerolinea();
            listAerolinea._listAerolinea = listAerolinea.getListAerolinea();
            let list = listAerolinea._listAerolinea;
            console.log(list.at(0));

            for (let index = 0; index < list.length; index++) {
                let tbody = document.getElementById('tbody');
                let fila = document.createElement('tr');

                let celdaNit = document.createElement('td');
                celdaNit.setAttribute('class', 'nit')
                let celdaNombre = document.createElement('td');
                let celdaTelefono = document.createElement('td');
                let celdaEditDelete = document.createElement('td');

                let nodoTextNit = document.createTextNode(list[index].nit);
                let nodoTextNombre = document.createTextNode(list[index].nombreAerolinea);
                let nodoTextTelefono = document.createTextNode(list[index].telefonoAerolinea);

                celdaNit.appendChild(nodoTextNit);
                celdaNombre.appendChild(nodoTextNombre);
                celdaTelefono.appendChild(nodoTextTelefono)

                fila.appendChild(celdaNit);
                fila.appendChild(celdaNombre);
                fila.appendChild(celdaTelefono);

                celdaEditDelete.innerHTML = '<a href="#editAerolineaModal" class="edit" data-bs-toggle="modal" data-bs-nit="' + list[index].nit + '" id="aEditAero"><i class="fa-solid fa-pencil" data-toggle="tooltip" title="Editar" style="font-size: 22px; margin: 0 5px;"></i></a>' +
                    '<a href="#deleteAerolineaModal" class="delete" data-bs-toggle="modal" data-bs-nit="' + list[index].nit + '"><i class="fa-solid fa-trash-can" data-toggle="tooltip" title="Eliminar" style="font-size: 22px; margin: 0 5px;"></i></a>';
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

                const inputNit = document.getElementById('inputNit').value;
                const inputNombre = document.getElementById('inputNombre').value;
                const inputTelefono = document.getElementById('inputTelefono').value;

                forms.forEach(form => {
                    ban = form.checkValidity();
                })

                if (ban == true) {

                    let aerolinea = new Aerolinea(inputNit, inputNombre, inputTelefono);
                    listAerolinea.addAerolinea(aerolinea);
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
                listAerolinea.editAerolinea(document.getElementById('oldNit').value, document.getElementById('inputNombreEdit').value, document.getElementById('inputTelefonoEdit').value);
                sessionStorage.setItem("hmsj", "Aviso");
                sessionStorage.setItem("msj", "El registro se actualizó correctamente");
                sessionStorage.setItem("typeMsj", "success");
                window.location.reload();
            });

            let formDelete = document.getElementById('form-DeleteAero');

            formDelete.addEventListener('submit', evt =>{ 
                evt.preventDefault();
                listAerolinea.deleteAerolinea(document.getElementById('nitDelete').value);
                sessionStorage.setItem("hmsj", "Aviso");
                sessionStorage.setItem("msj", "El registro se eliminó correctamente");
                sessionStorage.setItem("typeMsj", "success");
                window.location.reload();
            });

            let formAllDelete = document.getElementById('form-DeleteAeros');

            formAllDelete.addEventListener('submit', evt => {
                evt.preventDefault();
                listAerolinea.deleteAllAerolineas();
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

function getNit(event){
    let selection = event.relatedTarget;
    let nit = selection.getAttribute('data-bs-nit');

    return nit;
}

export { router };