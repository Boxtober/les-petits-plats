import { getRecipes } from './service.js';
import { recipeFactory } from './recipeFactory.js';
import { filterRecipes } from './filter.js';
import { initDropdown } from './dropdown.js';
import { ingredientsFilter } from './filters/ingredientsFilter.js';
import { ustensilsFilter } from './filters/ustensilsFilter.js';
import { appliancesFilter } from './filters/appliancesFilter.js';

document.addEventListener('DOMContentLoaded', async () => {

    let { recipes } = await getRecipes(); // Récupére les recette qui sont un tableau d'objets
    let filteredRecipes = recipes; // filteredRecipes sera une copie des recettes et est utilisée pour stocker les recettes filtrées
    let activeTags = []; // Contient tags actifs sélectionnés par l'utilisateur

    const searchInput = document.getElementById('searchInput');
    const recipesCountElement = document.getElementById('recipesCount');

    function displayRecipes(recipesToDisplay) {

        const recipeContainer = document.querySelector('.recipes-container');
        recipeContainer.textContent = ''; // Vide le conteneur avant d'ajouter nouvelles recettes

        const inputValue = searchInput.value.trim();  // Récupère valeur d'input de recherche et supprime les espaces

        if (recipesToDisplay.length === 0) { // Si aucune recette trouvé, affiche message d'erruer
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            recipeContainer.appendChild(errorMessage);

        } else { // Pour chaque recette trouvée, génère une carte de recette
            recipesToDisplay.forEach(recipe => {
                const recipeCard = recipeFactory(recipe).getRecipeCard();
                recipeContainer.appendChild(recipeCard);
            });
        }

        recipesCountElement.textContent = `${recipesToDisplay.length} recette${recipesToDisplay.length > 1 ? 's' : ''} disponible${recipesToDisplay.length > 1 ? 's' : ''}`;

    }

    function updateDropdown(filteredRecipes) { // MAJ des dropdowns en utilisant recettes filtrées

        let ingredients = ingredientsFilter(filteredRecipes, handleTagSelect);
        let appliances = appliancesFilter(filteredRecipes, handleTagSelect);
        let ustensils = ustensilsFilter(filteredRecipes, handleTagSelect);

        activeTags = [...ingredients, ...appliances, ...ustensils]// Combine tout tags actifs en un seul tableau

    }

    function handleTagSelect() {  // Appelée lorsque l'utilisateur sélectionne ou désélectionne un tag

        updateDropdown(filteredRecipes); // MAJ des dropdowns en fonction des tags actifs
        const query = searchInput.value.trim().toLowerCase(); // Récupère valeur de l'input de recherche
        filteredRecipes = filterRecipes(recipes, query, activeTags); //Filtre les recettes avec tags actifs et query utilisateur
        displayRecipes(filteredRecipes);  // Affiche les recettes filtrées
        updateDropdown(filteredRecipes); // MAJ dropdowns après l'affichage
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
            filteredRecipes = recipes; // Affiche toutes recettes si la recherche contient moins de 3 caractères
        }
        displayRecipes(filteredRecipes);  // Affiche les recettes après filtrage ou réinitialisation
        updateDropdown(filteredRecipes); // MAJ des dropdowns pour être synchronisés avec les recettes visibles
    });
});
