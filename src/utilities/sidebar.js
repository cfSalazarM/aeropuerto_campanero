//export this code in a object called sidebar and encapsule it in a function

const sidebar = {
    openCloseNav() {
        const openBtn = document.getElementById('open-btn');
        const closeBtn = document.getElementById('close-btn');

        openBtn.addEventListener('click', () => {
            document.getElementById('side-nav').classList.toggle('active');

        });

        closeBtn.addEventListener('click', () => {
            document.getElementById('side-nav').classList.toggle('active');
        });

    }
}

export default sidebar;


