import {Login} from './login.controller';
import Home from './home.controller';
import {AdminAirline} from './adminAirline.controller';
import {Register} from './register.controller';
import { AdminHangar } from './adminHangar.controller';

const pages = {
    login: Login,
    home: Home,
    adminAirline : AdminAirline,
    register: Register,
    adminHangar: AdminHangar
};

export {pages};