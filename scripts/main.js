import { getRecipes } from './service.js';
import { recipeFactory } from './recipeFactory.js';
import { filterRecipes } from './filter.js';
import { initDropdown } from './dropdown.js';


document.addEventListener('DOMContentLoaded', async () => {
    const { recipes } = await getRecipes();
    let activeTags = [];

    function displayRecipes(recipesToDisplay) {
        const recipeContainer = document.querySelector('.recipes-container');
        recipeContainer.innerHTML = '';

        //message d'erreur avec valeur de l'input
        const inputValue = searchInput.value.trim();
        if (recipesToDisplay.length === 0) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            recipeContainer.appendChild(errorMessage);
        } else {
            //sinon affiche toutes les recettes
            recipesToDisplay.forEach(recipe => {
                const recipeCard = recipeFactory(recipe).getRecipeCard();
                recipeContainer.appendChild(recipeCard);
            });
        }
    }

    if (recipes.length >= 3) {
        //affiche toutes les recettes lors du chargement initial de la page
        displayRecipes(recipes);
        initDropdown(recipes, handleTagSelect);

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            //recupere la valeur du champ utilisateur
            const query = searchInput.value.trim().toLowerCase();

            // filtre uniquement si la valeur est += 3 caracteres
            if (query.length >= 3) {

                const query = searchInput.value.trim().toLowerCase();

                // filtre les recettes avec valeur de linput et tags actifs
                const filteredRecipes = filterRecipes(recipes, query, activeTags);
                //affiche les résultats filtrés en fonction de la valeur de l'input et si la requete est >= à 3
                displayRecipes(filteredRecipes);
            } else {
                displayRecipes(recipes);
            }

        });
    } else {

        console.error('Aucune recette trouvée.');
    }

    //appelé à chaque maj des tags
    function handleTagSelect(selectedTags) {
        // activeTags est d'abord un tableau vide
        activeTags = selectedTags;
        const query = searchInput.value.trim().toLowerCase();
        const filteredRecipes = filterRecipes(recipes, query, activeTags);
        displayRecipes(filteredRecipes);
    }
});