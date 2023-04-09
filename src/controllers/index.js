import {Login} from './login.controller';
import Home from './home.controller';
import {AdminAirline} from './adminAirline.controller';
import {Register} from './register.controller';
import { AdminHangar } from './adminHangar.controller';
import { AirlinePilot } from './airlinePilot.controller';
import { AirlinePlane } from './airlinePlane.controller';
import { AirlineFlight } from './airlineFlight.controller';

const pages = {
    login: Login,
    home: Home,
    adminAirline : AdminAirline,
    register: Register,
    adminHangar: AdminHangar,
    airlinePilot: AirlinePilot,
    airlinePlane: AirlinePlane,
    airlineFlight: AirlineFlight
};

export {pages};