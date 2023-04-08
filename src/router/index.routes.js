import { pages } from "../controllers/index";

let content = document.getElementById('root');

const router = (route) => {
    content.innerHTML = '';
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
            content.appendChild(pages.login.loadView());
            pages.login.manageDom();

            return console.log('login');
        };
        case '#/registro':
            content.appendChild(pages.register.loadView());
            pages.register.manageDom();

            return console.log('registro');

        case '#/admin-airline': {
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if (session.typeUser === "admin") { 
                content.appendChild(pages.adminAirline.loadView());
                pages.adminAirline.manageDom();
            }
            else {
                window.location.hash = '#/login';
                sessionStorage.removeItem('session')
            }
            
            return console.log('admin-Aerolineas');
        };

        case '#/admin-hangar': {
            content.append(pages.adminHangar.loadView());
            pages.adminHangar.manageDom();

            return console.log('admin-Hangares');
        }

        case '#/airline': {

        }

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