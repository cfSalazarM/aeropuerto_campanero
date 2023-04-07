import Swal from 'sweetalert2';

const msj = {
    showWarningAdmin() {
        if (sessionStorage.getItem("msjA")) {
            Swal.fire(
                `${sessionStorage.getItem("hmsjA")}`,
                `${sessionStorage.getItem("msjA")}`,
                `${sessionStorage.getItem("typeMsjA")}`
            );

            sessionStorage.removeItem("hmsjA");
            sessionStorage.removeItem("msjA");
            sessionStorage.removeItem("typeMsjA");
        }
    },

    showMsj() {
        if (sessionStorage.getItem("msj")) {
            Swal.fire(
                `${sessionStorage.getItem("hmsj")}`,
                `${sessionStorage.getItem("msj")}`,
                `${sessionStorage.getItem("typeMsj")}`
            );

            sessionStorage.removeItem("hmsj");
            sessionStorage.removeItem("msj");
            sessionStorage.removeItem("typeMsj");
        }
    },

    fieldsOk(flag) {
        if (!flag) {
            sessionStorage.setItem("hmsj", "Error");
            sessionStorage.setItem("msj", "Por favor llene todos los campos");
            sessionStorage.setItem("typeMsj", "error");
            window.location.reload();
        }
    },

    numberOk(resultValidation) {
        if (!resultValidation.flag) {
            sessionStorage.setItem("hmsj", "Error");
            sessionStorage.setItem("msj", `${resultValidation.nameField} no valido/a - Debe contener solo numeros`);
            sessionStorage.setItem("typeMsj", "error");
            window.location.reload();
        }
    },

    Login0k(flag, hash) {
        if (flag === false) {
            sessionStorage.setItem("hmsj", "Error");
            sessionStorage.setItem("msj", "El usuario o contraseña ingresados son incorrectos");
            sessionStorage.setItem("typeMsj", "error");
            window.location.reload();
        }
        else {
            sessionStorage.setItem("hmsj", "Aviso");
            sessionStorage.setItem("msj", "Ingreso exitoso");
            sessionStorage.setItem("typeMsj", "success");
            window.location.hash = hash;
        }

    },

    issetAdmin(flag) {
        if (!flag) {
            sessionStorage.setItem("hmsjA", "Aviso");
            sessionStorage.setItem("msjA", "Aun no hay un admin registrado, por la tanto el usuario a registrar será el admin");
            sessionStorage.setItem("typeMsjA", "warning");
        }
    },

    RegisterOk() {
        sessionStorage.setItem("hmsj", "Aviso");
        sessionStorage.setItem("msj", "Registro exitoso");
        sessionStorage.setItem("typeMsj", "success");

        window.location.reload();
    },

    UpdateOk() {
        sessionStorage.setItem("hmsj", "Aviso");
        sessionStorage.setItem("msj", "El registro se actualizó correctamente");
        sessionStorage.setItem("typeMsj", "success");
        window.location.reload();
    },

    DeleteOk() {
        sessionStorage.setItem("hmsj", "Aviso");
        sessionStorage.setItem("msj", "El registro se eliminó correctamente");
        sessionStorage.setItem("typeMsj", "success");
        window.location.reload();
    },

    DeleteAllOk() {
        sessionStorage.setItem("hmsj", "Aviso");
        sessionStorage.setItem("msj", "Todos los registros se han eliminado correctamente");
        sessionStorage.setItem("typeMsj", "success");
        window.location.reload();
    }
}

export { msj };