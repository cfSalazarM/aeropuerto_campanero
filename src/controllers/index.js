import Login from './login.controller';
import Home from './home.controller';
import AdminAirline from './admin.controller'
import Register from './register.controller';

const pages = {
    login: Login,
    home: Home,
    AdminAirline: AdminAirline,
    register: Register
};

export {pages};