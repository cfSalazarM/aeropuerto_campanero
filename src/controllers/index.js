import Login from './login.controller';
import Home from './home.controller';
import Admin from './admin.controller'

const pages = {
    login: Login,
    home: Home,
    admin: Admin
};

export {pages};