export default function closeSession() {
    sessionStorage.clear();
    window.location.hash = '#/login';
}





