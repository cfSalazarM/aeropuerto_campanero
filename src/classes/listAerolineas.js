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
        console.log(this._listAerolinea);
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

        return i-1;
    }

    editAerolinea(nit, nombreAerolinea) {
        let a;
        let indice =this.getAerolineaByNit(nit);
        console.log( this._listAerolinea.at(indice).nombreAerolinaerolinea);
        this._listAerolinea.at(indice).nombreAerolinea = nombreAerolinea;
        console.log( this._listAerolinea.at(indice).nombreAerolinea);
        this.localStorageAeroList(this._listAerolinea);
       // a = localStorage.getItem('localAeroList').at(indice);
        //console.log(a);
    }

    localStorageAeroList(listAerolinea) {
        localStorage.setItem('localAeroList', JSON.stringify(listAerolinea));           
    }
}