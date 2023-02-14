import { pages } from "../controllers/index";
import Swal from 'sweetalert2'
import Aerolinea from "../classes/Aerolinea";
import ListAerolinea from "../classes/listAerolineas";

let content = document.getElementById('root');
var clickAEdit;

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
            
            const butAddAero = document.getElementById('bAddAerolinea');
            butAddAero.addEventListener('click', () => {
                let ban
                let forms = document.querySelectorAll('.needs-validation');
                validate();

                let tbody = document.getElementById('tbody');
                const inputNit = document.getElementById('inputNit').value;
                const inputNombre = document.getElementById('inputNombre').value;
                const inputTelefono = document.getElementById('inputTelefono').value;

                forms.forEach(form => {
                    ban = form.checkValidity();
                })

                if (ban == true) {
                    let fila = document.createElement('tr');

                    let celdaNit = document.createElement('td');
                    celdaNit.setAttribute('class', 'nit')
                    let celdaNombre = document.createElement('td');
                    let celdaTelefono = document.createElement('td');
                    let celdaEditDelete = document.createElement('td');

                    let nodoTextNit = document.createTextNode(inputNit);
                    let nodoTextNombre = document.createTextNode(inputNombre);
                    let nodoTextTelefono = document.createTextNode(inputTelefono);

                    celdaNit.appendChild(nodoTextNit);
                    celdaNombre.appendChild(nodoTextNombre);
                    celdaTelefono.appendChild(nodoTextTelefono)

                    fila.appendChild(celdaNit);
                    fila.appendChild(celdaNombre);
                    fila.appendChild(celdaTelefono);

                    celdaEditDelete.innerHTML = '<a href="#editAerolineaModal" class="edit" data-bs-toggle="modal" id="aEditAero"><i class="fa-solid fa-pencil" data-toggle="tooltip" title="Editar" style="font-size: 22px; margin: 0 5px;"></i></a>' +
                        '<a href="#deleteAerolineaModal" class="delete" data-bs-toggle="modal"><i class="fa-solid fa-trash-can" data-toggle="tooltip" title="Eliminar" style="font-size: 22px; margin: 0 5px;"></i></a>';
                    fila.appendChild(celdaEditDelete);

                    tbody.appendChild(fila);

                    const aEditAero = document.getElementById('aEditAero');
                    console.log(aEditAero);
                    

                    aEditAero.addEventListener('click', (evt)=> {
                        clickAEdit = document.activeElement.parentElement.parentElement.firstChild;
                        console.log(clickAEdit.textContent);
                    });

                    let aerolinea = new Aerolinea(inputNit, inputNombre, inputTelefono);
                    console.log(aerolinea);
                    console.log(listAerolinea.getListAerolinea());
                    listAerolinea.addAerolinea(aerolinea);
                    console.log(listAerolinea);
                    Swal.fire(
                        'Aviso',
                        'Registro exitoso',
                        'success'
                    )
                }
            });

            
            
           


            const butEditAero = document.getElementById('bEditAerolinea');
            butEditAero.addEventListener('click', () => {

                const inputNombreEdit = document.getElementById('inputNombreEdit').value;
                console.log(inputNombreEdit);
                console.log(listAerolinea);
                listAerolinea.editAerolinea(clickAEdit, inputNombreEdit);
                console.log(listAerolinea);

            });



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
    console.log(ban)    
}

export { router };