import views from "../views/register.html";
import { User } from "../classes/user";
import ListUsers from "../classes/listUsers";
import { msj } from "../utilities/messages";
import { validations } from "../utilities/validation";

const Register = {
    loadView() {
        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {
        let listUsers = new ListUsers();
        listUsers._listUsers = listUsers.getListUsers();

        msj.issetAdmin(listUsers.issetAdmin());
        msj.showWarningAdmin();
        msj.showMsj();

        const formRegister = document.getElementById('form-addUser');

        formRegister.addEventListener('submit', evt => {
            evt.preventDefault();

            let userName = document.getElementById('user').value;
            let name = document.getElementById('name').value;
            let phone = document.getElementById('phone').value;
            let password = document.getElementById('password').value;
            let typeUser = listUsers.issetAdmin() == true ? "client" : "admin";

            let fields = [userName, name, phone, password, typeUser];
            let passNumber = validations.isNumber([phone], ['Telefono']);

            let pass = validations.fieldEmpty(fields);
            if (!pass) {
                msj.fieldsOk(pass);
            }
            else if(!passNumber.flag) {
                msj.numberOk(passNumber);
            }
            else {
                let user = new User(userName, name, phone, typeUser, password);
                listUsers.addUser(user);
                msj.RegisterOk();
            }

        })
    }
}

export { Register };
