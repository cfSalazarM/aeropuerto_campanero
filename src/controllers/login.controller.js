import views from "../views/login.html";
import { User } from "../classes/user";
import ListUsers from "../classes/listUsers";
import { msj } from "../../utilities/messages";


const Login = {
    loadView () {
        const divElement = document.createElement('div');
        divElement.innerHTML = views;
    
        return divElement;
    },

    manageDom() {
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
    }
}

export { Login };

