'use strict';

import { forEach } from "lodash";

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
        console.log(this._listAerolinea);
       }
       return this._listAerolinea;
    }

    getAerolineaByNit(nit) {
        for (let index = 0; index < this._listAerolinea.length; index++) {
            if (this._listAerolinea[index].nit === nit) {
                return index;
            }
            
        }
    }

    editAerolinea(oldNit, nombreAerolinea, telefonoAerolinea) {
        let indice = this.getAerolineaByNit(oldNit);
        console.log(indice);
        this._listAerolinea.at(indice).nombreAerolinea = nombreAerolinea;
        this._listAerolinea.at(indice).telefonoAerolinea = telefonoAerolinea;
        this.localStorageAeroList(this._listAerolinea);
       
    }

    deleteAerolinea(nit) {
        this._listAerolinea = this._listAerolinea.filter(aerolinea => aerolinea.nit != nit);
        this.localStorageAeroList(this._listAerolinea);
    }

    deleteAllAerolineas() {
        localStorage.removeItem('localAeroList');
    }

    localStorageAeroList(listAerolinea) {
        localStorage.setItem('localAeroList', JSON.stringify(listAerolinea));           
    }
}