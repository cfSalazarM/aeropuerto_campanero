import views from "../views/register.html";

export default () => {
    
    const divElement = document.createElement('div');
    divElement.innerHTML = views;

    return divElement;
};