import views from "../views/login.html";
import { User } from "../classes/user";
import ListUsers from "../classes/listUsers";
import { msj } from "../utilities/messages";
import { validations } from "../utilities/validation";
import { forIn } from "lodash";

const Login = {
    loadView() {
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
            let fields = [user, password];

            let pass = validations.fieldEmpty(fields);
            if (!pass) {
                msj.fieldsOk(pass);
            }
            else {
                let listUsers = new ListUsers();
                listUsers._listUsers = listUsers.getListUsers();

                let flag = listUsers.authUser(user, password);
                if (flag) {
                    let i = listUsers.getUser(user);
                    let item = listUsers._listUsers.at(i);
                    sessionStorage.setItem("session", JSON.stringify(item));
                    const hashs = {
                       admin: "#/admin-airline" ,
                       airline: "#/airline-pilot"
                    }

                    let hash;

                    for (const key in hashs) {
                        if (key === item.typeUser) {
                            hash = hashs[key];
                            console.log(hash);
                            break;
                            
                        }
                    }

                    msj.Login0k(flag, hash);
                   
                }
                else {
                    msj.Login0k(flag, "");
                }
                
            }


        });
    }
}

export { Login };

