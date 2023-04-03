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
        console.log(this._listUsers);
       }
       return this._listUsers;
    }

    getListByType(typeUser) {
        let list = this._listUsers.filter(user => user.typeUser === typeUser)

        return list
    }

    getUser(typeUser, user) {
        for (let index = 0; index < this._listUsers.length; index++) {
            if (this._listUsers[index].nit === nit) {
                return index;
            }
            
        }
    }

    authUser(user, password) {
        let list = this._listUsers.filter(item => item.user === user && item.password === password )

        return list.length > 0 && list.length < 2
    }

    issetAdmin() {
        let result = this._listUsers.filter(user => user.typeUser === "admin");

        let ban = result.length === 0 ? false : true;
        return ban
    }

    editUser(oldUser, nameUser, phoneUser) {
        let indice = this.getUser(oldUser);
        console.log(indice);
        this._listUsers.at(indice).nombreAerolinea = nameUser;
        this._listUsers.at(indice).telefonoAerolinea = phoneUser;
        this.localStorageAeroList(this._listUsers);
       
    }

    deleteUser(typeUser, user) {
        this._listUsers = this._listUsers.filter(item => item.user != user);
        this.localStorageAeroList(this._listUsers);
    }

    deleteAllUsers() {
        localStorage.removeItem('localUList');
    }

    localStorageUList(listAerolinea) {
        localStorage.setItem('localUList', JSON.stringify(listAerolinea));           
    }
}