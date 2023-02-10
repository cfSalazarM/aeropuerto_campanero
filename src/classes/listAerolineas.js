'use strict';
export default class ListAerolinea {
    _listAerolinea = [];

    addAerolinea(aerolinea) {
        this._listAerolinea.push(aerolinea);
        this.localStorageAeroList(this._listAerolinea);
    }

    getListAerolinea() {
       let storageList = localStorage.getItem('localAeroList');
       if(storageList == null) {
        this._listAerolinea = [];
       }
       else {
        this._listAerolinea = JSON.parse(storageList);
       }
       return this._listAerolinea;
    }

    getAerolineaByNit(nit) {
        let i = 0;
        for(i; i<this._listAerolinea.length; i++) {
            if(this._listAerolinea[i].nit == nit) {
                break;
            }

        }

        return i;
    }

    editAerolinea(nit, nombreAerolinea) {
        let indice =this.getAerolineaByNit(nit);
        this._listAerolinea.at(indice).nombreAerolinea = nombreAerolinea;
        this.localStorageAeroList(this._listAerolinea);
    }

    localStorageAeroList(listAerolinea) {
        localStorage.setItem('localAeroList', JSON.stringify(listAerolinea));           
    }
}