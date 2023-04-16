'use strict';

export default class ListHangares {
    _listHangar = [];


    addHangar(hangar) {
        this._listHangar.push(hangar);
        this.localStorageHList(this._listHangar);
    }

    getListHangar() {
        let storageList = localStorage.getItem('localHList');
        if (storageList == null) {
            this._listHangar = [];
        }
        else {
            this._listHangar = JSON.parse(storageList);
        }
        return this._listHangar;
    }

    getHangarByCode(code) {
        let result = this._listHangar.findIndex((item) => item.code === code);

        return result
    }

    checkHangar(code) {
        return this._listHangar.some(hangar => hangar.code === code);
    }

    editHangar(code, capacity, location) {
        let indice = this.getHangarByCode(code);
        this._listHangar.at(indice).code = code;
        this._listHangar.at(indice).capacity = capacity;
        this._listHangar.at(indice).location = location;
        this.localStorageHList(this._listHangar);
       
    }

    deleteHangar(code) {
        this._listHangar = this._listHangar.filter(hangar => hangar.code != code);
        this.localStorageHList(this._listHangar);
    }

    deleteAllHangares() {
        localStorage.removeItem('localHList');
    }

    localStorageHList(listHangares) {
        localStorage.setItem('localHList', JSON.stringify(listHangares));           
    }
}