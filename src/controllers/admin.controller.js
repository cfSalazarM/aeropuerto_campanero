import views from "../views/admin-airline.html";

export default () => {
    
    const divElement = document.createElement('div');
    divElement.innerHTML = views;

    return divElement;
};