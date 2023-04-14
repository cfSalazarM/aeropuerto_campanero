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

        const form = document.getElementById('form');

        form.addEventListener('submit', evt => {
            evt.preventDefault();

            const indiceCO = selectCO.selectedIndex;
            const cityOrigin = selectCO.options[indiceCO].value;

            const indiceCD = selectCD.selectedIndex;
            const cityDestiny = selectCD.options[indiceCD].value;

            const date = document.getElementById('date').value;

            const adults = document.getElementById('adults-input').value;
            const children = document.getElementById('children-input').value;
            const infants = document.getElementById('infants-input').value;

            const search = {
                cityOrigin: cityOrigin,
                cityDestiny: cityDestiny,
                date: date,
                adults: adults,
                children: children,
                infants: infants
            }

            sessionStorage.setItem('search-flight', JSON.stringify(search));
            window.location.hash = '#/avb-flight';

        })

        function cleanSelect(select) {

            for (let i = select.options.length; i >= 0; i--) {
                select.remove(i);
            }
        }
    }

};

export {Home};