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
        recipeContainer.innerHTML = '';

        const inputValue = searchInput.value.trim();
        if (recipesToDisplay.length === 0) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            recipeContainer.appendChild(errorMessage);
        } else {
            for (let i = 0; i < recipesToDisplay.length; i++) {
                const recipeCard = recipeFactory(recipesToDisplay[i]).getRecipeCard();
                recipeContainer.appendChild(recipeCard);
            }
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



    initDropdown(recipes, handleTagSelect);
    displayRecipes(recipes);


    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length >= 3) {
            filteredRecipes = filterRecipes(recipes, query, activeTags);
        } else {
            filteredRecipes = recipes;
        }
        displayRecipes(filteredRecipes);
        updateDropdown(filteredRecipes);
    });


});
