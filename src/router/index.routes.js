import { pages } from "../controllers/index";
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
            content.appendChild(pages.login.loadView());

            pages.login.manageDom();
           
            return console.log('login');
        };
        case '#/registro':
            content.innerHTML = '';
            content.appendChild(pages.register.loadView());

            pages.register.manageDom();
            
            return console.log('registro');
           
        case '#/admin-Airline': {
            content.innerHTML = '';
            content.appendChild(pages.adminAirline.loadView());
    
           pages.adminAirline.manageDom();

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



export { router };