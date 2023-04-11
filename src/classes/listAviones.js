'use strict';

export default class ListPlanes {
    _listPlane = [];


    addPlane(plane) {
        this._listPlane.push(plane);
        this.localStoragePList(this._listPlane);
    }

    getListPlane() {
        let storageList = localStorage.getItem('localPList');
        if (storageList == null) {
            this._listPlane = [];
        }
        else {
            this._listPlane = JSON.parse(storageList);
        }
        return this._listPlane;
    }

    getPlaneById(id) {
        let result = this._listPlane.findIndex((plane) => plane.id === id);

        return result
    }

    getPlane(id) {
        let result = this._listPlane.find((plane) => plane.id === id);

        return result
    }

    editPlane(id, model, capacity) {
        let indice = this.getPlaneById(id);
        this._listPlane.at(indice).id = id;
        this._listPlane.at(indice).model = model;
        this._listPlane.at(indice).capacity = capacity;
        this.localStoragePList(this._listPlane);
       
    }

    deletePlane(id) {
        this._listPlane = this._listPlane.filter(plane => plane.id != id);
        this.localStoragePList(this._listPlane);
    }

    deleteAllPlanes() {
        localStorage.removeItem('localPList');
    }

    localStoragePList(listPlanes) {
        localStorage.setItem('localPList', JSON.stringify(listPlanes));           
    }
}