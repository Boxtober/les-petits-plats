import { getRecipes } from './service.js';
import { recipeFactory } from './recipeFactory.js';
import { filterRecipes } from './filter.js';
import { initDropdown } from './dropdown.js';
import { ingredientsFilter } from './filters/ingredientsFilter.js';
import { ustensilsFilter } from './filters/ustensilsFilter.js';
import { appliancesFilter } from './filters/appliancesFilter.js';


document.addEventListener('DOMContentLoaded', async () => {

    let { recipes } = await getRecipes();
    // creer variable filterdrecipe vide
    // let filteredRecipes;
    let filteredRecipes = recipes;


    let activeTags = [];
    const searchInput = document.getElementById('searchInput');

    function displayRecipes(recipesToDisplay) {
        const recipeContainer = document.querySelector('.recipes-container');
        recipeContainer.innerHTML = '';

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
    }

    // function updateDropdown(recipes) {
    //     ingredientsFilter(recipes, handleTagSelect)
    // } 
    function updateDropdown(filteredRecipes) {
        ingredientsFilter(filteredRecipes, handleTagSelect);
        appliancesFilter(filteredRecipes, handleTagSelect)
        ustensilsFilter(filteredRecipes, handleTagSelect)
    }
    // function handleTagSelect(selectedTags) {

    //     activeTags = selectedTags;
    //     const query = searchInput.value.trim().toLowerCase();
    //     //        const filteredRecipes = filterRecipes(recipes, query, activeTags);
    //     // enlever const
    //     filteredRecipes = filterRecipes(recipes, query, activeTags);

    //     recipes = filteredRecipes;
    //     console.log(recipes)
    //     console.log(filteredRecipes)

    //     displayRecipes(filteredRecipes);
    //     updateDropdown(filteredRecipes);
    // }
    function handleTagSelect(selectedTags) {
        activeTags = selectedTags;
        const query = searchInput.value.trim().toLowerCase();

        // Recalculez `filteredRecipes` en fonction des tags actifs et de la recherche
        filteredRecipes = filterRecipes(recipes, query, activeTags);

        // Mettez à jour l'affichage des recettes et des dropdowns
        displayRecipes(filteredRecipes);
        updateDropdown(filteredRecipes);
    }

    initDropdown(recipes, handleTagSelect);
    displayRecipes(recipes);
    updateDropdown(recipes);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        // let filteredRecipes = recipes;
        // ne pas l'initialiser ici
        if (query.length >= 3) {
            filteredRecipes = filterRecipes(recipes, query, activeTags);
        } else {
            filteredRecipes = recipes; // Affiche toutes les recettes si la recherche est inférieure à 3 caractères
        }
        displayRecipes(filteredRecipes);
        updateDropdown(filteredRecipes);
    });

});

// import { getRecipes } from './service.js';
// import { recipeFactory } from './recipeFactory.js';
// import { filterRecipes } from './filter.js';
// import { initDropdown } from './dropdown.js';
// import { ingredientsFilter } from './filters/ingredientsFilter.js';

// document.addEventListener('DOMContentLoaded', async () => {

//     let { recipes } = await getRecipes();
//     // creer variable filterdrecipe vide
//     // let filteredRecipes;
//     let filteredRecipes = recipes;


//     let activeTags = [];
//     const searchInput = document.getElementById('searchInput');

//     function displayRecipes(recipesToDisplay) {
//         const recipeContainer = document.querySelector('.recipes-container');
//         recipeContainer.innerHTML = '';

//         const inputValue = searchInput.value.trim();
//         if (recipesToDisplay.length === 0) {
//             const errorMessage = document.createElement('p');
//             errorMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
//             recipeContainer.appendChild(errorMessage);
//         } else {
//             recipesToDisplay.forEach(recipe => {
//                 const recipeCard = recipeFactory(recipe).getRecipeCard();
//                 recipeContainer.appendChild(recipeCard);
//             });
//         }
//     }

//     // function updateDropdown(recipes) {
//     //     ingredientsFilter(recipes, handleTagSelect)
//     // }
//     function updateDropdown(filteredRecipes) {
//         ingredientsFilter(filteredRecipes, handleTagSelect)
//     }
//     // function handleTagSelect(selectedTags) {

//     //     activeTags = selectedTags;
//     //     const query = searchInput.value.trim().toLowerCase();
//     //     //        const filteredRecipes = filterRecipes(recipes, query, activeTags);
//     //     // enlever const
//     //     filteredRecipes = filterRecipes(recipes, query, activeTags);

//     //     recipes = filteredRecipes;
//     //     console.log(recipes)
//     //     console.log(filteredRecipes)

//     //     displayRecipes(filteredRecipes);
//     //     updateDropdown(filteredRecipes);
//     // }
//     function handleTagSelect(selectedTags) {
//         activeTags = selectedTags;
//         const query = searchInput.value.trim().toLowerCase();

//         // Recalculez `filteredRecipes` en fonction des tags actifs et de la recherche
//         filteredRecipes = filterRecipes(recipes, query, activeTags);

//         // Mettez à jour l'affichage des recettes et des dropdowns
//         displayRecipes(filteredRecipes);
//         updateDropdown(filteredRecipes);
//     }

//     initDropdown(recipes, handleTagSelect);
//     displayRecipes(recipes);
//     updateDropdown(recipes);

//     searchInput.addEventListener('input', () => {
//         const query = searchInput.value.trim().toLowerCase();
//         // let filteredRecipes = recipes;
//         // ne pas l'initialiser ici
//         if (query.length >= 3) {
//             filteredRecipes = filterRecipes(recipes, query, activeTags);
//         } else {
//             filteredRecipes = recipes; // Affiche toutes les recettes si la recherche est inférieure à 3 caractères
//         }
//         displayRecipes(filteredRecipes);
//         updateDropdown(filteredRecipes);
//     });

// });