import { pages } from "../controllers/index";

let content = document.getElementById('root');

const defaultRoute = 'http://localhost:8080/';
//create a object with all type users and main route
const typeUser = {
    admin: {
        route: '#/admin-airline',
    },
    airline: {
        route: '#/airline-pilot',
    }
    
};


const router = (route) => {
    content.innerHTML = '';
    switch (route) {
        case '#/aerolineas':
            return console.log('aerolineas');
        case '#/sobreNosotros':
            return console.log('sobreNosotros');
        case '#/login': {
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if (string) {
                window.location.hash = typeUser[session.typeUser].route;
            }
            else {
                content.appendChild(pages.login.loadView());
                pages.login.manageDom();
            }
            return console.log('login');
        };
        case '#/registro':
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if (string) {
                window.location.hash = typeUser[session.typeUser].route;
            }
            else {
                content.appendChild(pages.register.loadView());
                pages.register.manageDom();
            }

            return console.log('registro');

        case '#/admin-airline': {
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if (string) {
                if (session.typeUser === 'admin') { 
                    console.log('entro');
                    content.appendChild(pages.adminAirline.loadView());
                    pages.adminAirline.manageDom();
                }
                else {
                    window.location.hash = typeUser[session.typeUser].route;
                }
            }
            else {
                window.location.href =  defaultRoute;
            }

            console.log(typeUser['admin']);
            return console.log('admin-Aerolineas');
        }

        case '#/admin-flight': {
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if (string) {
                if (session.typeUser === "admin") { 
                    content.appendChild(pages.adminFlight.loadView());
                    pages.adminFlight.manageDom();
                }
                else {
                    window.location.hash = typeUser[session.typeUser].route;
                }
            }
            else {
                window.location.href = defaultRoute;
            }
            
            return console.log('admin-Vuelos');
        };

        case '#/admin-hangar': {
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if (string) {
                if (session.typeUser === "admin") {

                content.append(pages.adminHangar.loadView());
                pages.adminHangar.manageDom();
                }
                else {
                    window.location.hash = typeUser[session.typeUser].route;
                }
            }
            else {
                window.location.href = defaultRoute;
            }

            return console.log('admin-Hangares');
        }

        case '#/airline-pilot': {
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if(string) {
                if (session.typeUser === "airline") { 
                    content.append(pages.airlinePilot.loadView());
                    pages.airlinePilot.manageDom();
                }
                else {
                    window.location.hash = typeUser[session.typeUser].route;
                }
            }
            else {
                window.location.href = defaultRoute;
            }
            return console.log('aerolinea-Pilotos');
        }

        case '#/airline-plane': {
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if (string) {
                if (session.typeUser === "airline") { 
                    content.append(pages.airlinePlane.loadView());
                    pages.airlinePlane.manageDom();
                }
                else {
                    window.location.hash = typeUser[session.typeUser].route;
                }
            }
            else {
                window.location.href = defaultRoute;
            }
            return console.log('aerolinea-Aviones');
        }

        case '#/airline-flight': {
            let string = sessionStorage.getItem('session');
            let session = JSON.parse(string);

            if (string) {
                if (session.typeUser === "airline") { 
                    content.append(pages.airlineFlight.loadView());
                    pages.airlineFlight.manageDom();
                }
                else {
                    window.location.hash = typeUser[session.typeUser].route;
                }
            }
            else {
                window.location.href = defaultRoute;
            }

            return console.log('aerolinea-Vuelos');
        }

        case '#/avb-flight': {
            let search = sessionStorage.getItem('search-flight');
            let user = sessionStorage.getItem('session');
            let session = JSON.parse(search);
            let userSession = JSON.parse(user);

            if (session) { 
                content.append(pages.availabilityFlight.loadView());
            }
            else if (userSession) {
                window.location.hash = typeUser[userSession.typeUser].route;
            }
            else {
                window.location.href = defaultRoute;
            }
            return console.log('aerolinea-Vuelos');
        }

        default: {
            if (window.location.href == 'http://localhost:8080/') {
                content.innerHTML = '';
                content.appendChild(pages.home.loadView());
                pages.home.manageDom();
                return console.log('Home');
            };
            return console.log('404!!!');
        }
    }


}

export { router };