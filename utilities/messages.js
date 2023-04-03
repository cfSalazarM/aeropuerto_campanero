import Swal from 'sweetalert2';

const msj = {

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
            sessionStorage.setItem("hmsj", "Aviso");
            sessionStorage.setItem("msj", "Aun no hay un admin registrado, por la tanto el usuario a registrar será el admin");
            sessionStorage.setItem("typeMsj", "warning");
        }
    },

    RegisterOk() {
        sessionStorage.setItem("hmsj", "Aviso");
        sessionStorage.setItem("msj", "Registro exitoso");
        sessionStorage.setItem("typeMsj", "success");

        window.location.reload();
    }
}

export { msj };