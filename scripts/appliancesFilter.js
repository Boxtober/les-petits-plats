export function appliancesFilter(recipes, onTagSelect) {

    // affiche / ferme le dropdown 
    document.getElementById('menuButtonApplience').addEventListener('click', () => {
        const menuItems = document.getElementById('menuItemsApplience');
        const menuButton = document.getElementById('menuButtonApplience');

        menuItems.classList.toggle('hidden');
        const isOpen = !menuItems.classList.contains('hidden');

        if (isOpen) {
            menuButton.classList.add('menu-open');
            console.log('oooooooooo')
        } else {
            menuButton.classList.remove('menu-open');
            console.log('aaaaaaaaaa')

        }
    });


}