'use strict';

export default class ListUsers {
    _listUsers = [];

    addUser(user) {
        this._listUsers.push(user);
        this.localStorageUList(this._listUsers);
    }

    getListUsers() {
       let storageList = localStorage.getItem('localUList');
       if(storageList == null) {
        this._listUsers = [];
       }
       else {
        this._listUsers = JSON.parse(storageList);
       }
       return this._listUsers;
    }

    getListByType(typeUser) {
        let list = this._listUsers.filter(user => user.typeUser === typeUser);

        return list
    }

    getUser(user) {
        let result = this._listUsers.findIndex((item) => item.user === user);

        return result
    }

    authUser(user, password) {
        let list = this._listUsers.filter(item => item.user === user && item.password === password );

        return list.length > 0 && list.length < 2
    }

    issetAdmin() {
        let result = this._listUsers.filter(user => user.typeUser === "admin");

        let ban = result.length === 0 ? false : true;
        return ban
    }

    editUser(oldUser, nameUser, phone, password) {
        let indice = this.getUser(oldUser);

        this._listUsers.at(indice).nameUser = nameUser;
        this._listUsers.at(indice).phone = phone;
        this._listUsers.at(indice).password = password;
        this.localStorageUList(this._listUsers);
       
    }

    deleteUser(user) {
        this._listUsers = this._listUsers.filter(item => item.user != user);
        this.localStorageUList(this._listUsers);
    }

    deleteAllUsers(typeUser) {
        this._listUsers = this._listUsers.filter(item => item.typeUser != typeUser);
        this.localStorageUList(this._listUsers);
    }

    localStorageUList(listAerolinea) {
        localStorage.setItem('localUList', JSON.stringify(listAerolinea));           
    }
}