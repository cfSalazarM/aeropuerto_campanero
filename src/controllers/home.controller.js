import views from "../views/home.html";
import cities from "../utilities/cities.json";

const Home = {
    loadView() {
        const divElement = document.createElement('div');
        divElement.innerHTML = views;

        return divElement;
    },

    manageDom() {

        let selectCO = document.getElementById('s-city');
        let selectCD = document.getElementById('s-cityDestiny');

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.text = city.name;
            selectCO.appendChild(option);
        });

        let indice = selectCO.selectedIndex;
        let opcionSeleccionada = selectCO.options[indice].value;

        cities.forEach(city => {
            const option = document.createElement('option');
            if (city.name != opcionSeleccionada) {
                option.value = city.name;
                option.text = city.name;
                selectCD.appendChild(option);
            }
        });

        selectCO.addEventListener('change', () => {
            cleanSelect(selectCD);
            indice = selectCO.selectedIndex;
            opcionSeleccionada = selectCO.options[indice].value;
            console.log(opcionSeleccionada);

            cities.forEach(city => {
                const option = document.createElement('option');
                if (city.name != opcionSeleccionada) {
                    option.value = city.name;
                    option.text = city.name;
                    selectCD.appendChild(option);
                }
                
            });
        });

        function cleanSelect(select) {

            for (let i = select.options.length; i >= 0; i--) {
                select.remove(i);
            }
        }
    }

};

export {Home};