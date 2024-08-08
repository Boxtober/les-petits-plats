// export function appliancesFilter(recipes, onTagSelect) {

//     // affiche / ferme le dropdown
//     document.getElementById('menuButtonApplience').addEventListener('click', () => {
//         const menuItems = document.getElementById('menuItemsApplience');
//         const menuButton = document.getElementById('menuButtonApplience');

//         menuItems.classList.toggle('hidden');
//         const isOpen = !menuItems.classList.contains('hidden');

//         if (isOpen) {
//             menuButton.classList.add('menu-open');
//         } else {
//             menuButton.classList.remove('menu-open');
//         }
//     });

// }


document.querySelectorAll('.dropdown').forEach(dropdown => {
    const button = dropdown.querySelector('button');
    const menuItems = dropdown.querySelector('.menu-items');

    button.addEventListener('click', () => {
        menuItems.classList.toggle('hidden');
        const isOpen = !menuItems.classList.contains('hidden');
        button.classList.toggle('menu-open', isOpen);
    });

});