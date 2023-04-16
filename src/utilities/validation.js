

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
    },

    isNumber(fields, nameFields) {
        let ban = true;
        let nameField = "";
        for (let i = 0; i < fields.length; i++) {
            if (isNaN(fields[i])) {
                ban = false;
                nameField = nameFields[i];
                break;
            } 
        }

        return {flag: ban, nameField: nameField};
    },

    validateDate(date) {
        let ban = true;
        let currentDate = new Date();
        let dateFlight = new Date(date);
        if (currentDate > dateFlight) {
            ban = false;
        }

        return ban;
    }
} 


export {validations};