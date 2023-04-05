import ListUsers from "../src/classes/listUsers"

const validations = {
    fieldEmpty(fields) {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i] === "") {
                return false;
            }
            else if (fields[fields.length - 1]) {
                return true;
            }     
        }
    }
} 


export {validations};