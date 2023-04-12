'use strict';

export default class ListFlights {
    _listFlight = [];


    addFlight(flight) {
        this._listFlight.push(flight);
        this.localStorageFList(this._listFlight);
    }

    getListFlight() {
        let storageList = localStorage.getItem('localFList');
        if (storageList == null) {
            this._listFlight = [];
        }
        else {
            this._listFlight = JSON.parse(storageList);
        }
        return this._listFlight;
    }

    getFlightByCode(code) {
        let result = this._listFlight.findIndex((item) => item.code === code);

        return result
    }

    getFlight(code) {
        let result = this._listFlight.find((item) => item.code === code);

        return result
    }

    editFlight(code, capacity, location) {
        let indice = this.getFlightByCode(code);
        this._listFlight.at(indice).code = code;
        this._listFlight.at(indice).capacity = capacity;
        this._listFlight.at(indice).location = location;
        this.localStorageFList(this._listFlight);
       
    }

    updateState(codeFlight, newState) {
        let indice = this.getFlightByCode(codeFlight);
        this._listFlight.at(indice).state = newState;
        this.localStorageFList(this._listFlight);
    }

    deleteFlight(code) {
        this._listFlight = this._listFlight.filter(flight => flight.code != code);
        this.localStorageHList(this._listFlight);
    }

    deleteAllFlights() {
        localStorage.removeItem('localFList');
    }

    scheduleflight() {
        
    }

    localStorageFList(listFlights) {
        localStorage.setItem('localFList', JSON.stringify(listFlights));           
    }
}