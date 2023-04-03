import ListUsers from "../src/classes/listUsers"

const validations = {
    issetAdmin(user) {
        let listUsers = new ListUsers();
        listUsers= listUsers.getListUsers();
        let users = listUsers._listUsers;

        let result = users.filter(user => user.typeUser === "admin");

        let ban = result ? true : false;

        return ban
    }
} 


export {validations};