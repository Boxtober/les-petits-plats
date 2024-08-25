import { ingredientsFilter } from './filters/ingredientsFilter.js';
import { appliancesFilter } from './filters/appliancesFilter.js';
import { ustensilsFilter } from './filters/ustensilsFilter.js';

export function initDropdown(recipes, onTagSelect) {
    // Initialisation des filtres avec les recettes
    ingredientsFilter(recipes, onTagSelect);
    appliancesFilter(recipes, onTagSelect);
    ustensilsFilter(recipes, onTagSelect);

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const menuItems = dropdown.querySelector('.menu-items');

        button.addEventListener('click', () => {
            menuItems.classList.toggle('hidden');
            const isOpen = !menuItems.classList.contains('hidden');
            button.classList.toggle('menu-open', isOpen);
        });
    });
}

// Mettre à jour les filtres en fonction des recettes filtrées
export function updateDropdowns(filteredRecipes, onTagSelect) {
    ingredientsFilter(filteredRecipes, onTagSelect);
    appliancesFilter(filteredRecipes, onTagSelect);
    ustensilsFilter(filteredRecipes, onTagSelect);
}

