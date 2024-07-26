// async function init() {
//     try {

//         const { recipes } = await getRecipes();

//         recipes.forEach((recipeObject) => {
//             const recipesSection = document.querySelector(".recipes-container");
//             const recipeFactories = recipeFactory(recipeObject);
//             const recipeCard = recipeFactories.getRecipeCard();
//             recipesSection.appendChild(recipeCard);
//         });

//         initDropdown(recipes);

//     } catch (error) {
//         console.error('Erreur lors de l\'initialisation:', error);
//     }
// }

// init();

