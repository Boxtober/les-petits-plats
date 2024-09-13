import { getRecipes } from './service.js';
import { recipeFactory } from './recipeFactory.js';
import { filterRecipes } from './filter.js';
import { initDropdown } from './dropdown.js';
import { ingredientsFilter } from './filters/ingredientsFilter.js';
import { ustensilsFilter } from './filters/ustensilsFilter.js';
import { appliancesFilter } from './filters/appliancesFilter.js';

document.addEventListener('DOMContentLoaded', async () => {
    let { recipes } = await getRecipes();
    let filteredRecipes = recipes;
    let activeTags = [];
    const searchInput = document.getElementById('searchInput');
    const recipesCountElement = document.getElementById('recipesCount');

    function displayRecipes(recipesToDisplay) {
        const recipeContainer = document.querySelector('.recipes-container');
        recipeContainer.textContent = '';

        const inputValue = searchInput.value.trim();
        if (recipesToDisplay.length === 0) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            recipeContainer.appendChild(errorMessage);
        } else {
            recipesToDisplay.forEach(recipe => {
                const recipeCard = recipeFactory(recipe).getRecipeCard();
                recipeContainer.appendChild(recipeCard);
            });
        }

        recipesCountElement.textContent = `${recipesToDisplay.length} recette${recipesToDisplay.length > 1 ? 's' : ''} disponible${recipesToDisplay.length > 1 ? 's' : ''}`;

    }
    function updateDropdown(filteredRecipes) {
        let ingredients = ingredientsFilter(filteredRecipes, handleTagSelect);
        let appliances = appliancesFilter(filteredRecipes, handleTagSelect);
        let ustensils = ustensilsFilter(filteredRecipes, handleTagSelect);

        activeTags = [...ingredients, ...appliances, ...ustensils]

    }

    function handleTagSelect() {
        updateDropdown(filteredRecipes);


        const query = searchInput.value.trim().toLowerCase();
        filteredRecipes = filterRecipes(recipes, query, activeTags);

        displayRecipes(filteredRecipes);
        updateDropdown(filteredRecipes);
    }


    // Initialisation des dropdowns
    initDropdown(recipes, handleTagSelect);
    // Affichage initial des recettes
    displayRecipes(recipes);

    // Gestion de la recherche textuelle
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length >= 3) {
            filteredRecipes = filterRecipes(recipes, query, activeTags);
        } else {
            filteredRecipes = recipes; // Affiche toutes les recettes si la recherche contient moins de 3 caractères
        }
        displayRecipes(filteredRecipes);
        updateDropdown(filteredRecipes);
    });

    // met à jour updateDropdown(filteredRecipes); au clic de creatTag de appliance et ustensils

});
