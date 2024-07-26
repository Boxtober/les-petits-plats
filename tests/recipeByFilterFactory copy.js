function recipeByFilterFactory(recipes) {
    let recipesFiltered = recipes;
    let recipesObject = [];

    //recherche
    recipesFiltered.forEach((recipe) => {
        let recipeProperty = {
            id: recipe.id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            appliance: recipe.appliance,
            ustensils: recipe.ustensils,
            image: recipe.image,
            time: recipe.time,
            description: recipe.description,
            servings: recipe.servings
        };

        recipesObject.push(recipeProperty);
    });

    const displayAllRecipe = () => {
        // filterByFilter();
        displayInit();
        // displayBySearch()
    }

    // const filterByFilter = () => {
    //     const ingredient = "";
    //     filterByIngredients(ingredient, recipesObject);
    // }

    const displayInit = () => {
        const recipesSection = document.querySelector(".recipes-container");
        recipesSection.innerHTML = '';

        recipesObject.forEach((recipe) => {
            const recipeFactoryFiltered = recipeFactory(recipe);
            const recipeCard = recipeFactoryFiltered.getRecipeCard();
            recipesSection.appendChild(recipeCard);
        });
    }

    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient);
        });
    });

    // displayBySearch(recipes) {
    //     const searchRecipes = document.querySelector(".search-recipes");
    //     const recipesItems = 

    // }


    // function filterByIngredients(ingredient, recipes) {
    //     const recipesSection = document.querySelector(".recipes-container");
    //     recipesSection.innerHTML = '';

    //     const filteredRecipes = recipes.filter(recipe =>
    //         recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === ingredient.toLowerCase())
    //     );

    //     filteredRecipes.forEach(recipeObject => {
    //         const recipeFactoryFiltered = recipeFactory(recipeObject);
    //         const recipeCard = recipeFactoryFiltered.getRecipeCard();
    //         recipesSection.appendChild(recipeCard);
    //     });
    // }

    // filterByIngredients, filterByFilter,
    return {
        recipes, displayAllRecipe
    }
}


// function recipeByFilterFactory(recipes) {
//     let recipesFilterded = recipes;
//     let recipesObject = []

//     recipesFilterded.forEach((recipe) => {
//         let recipeProperty = {
//             id: recipe.id,
//             name: recipe.name,
//             ingredients: recipe.ingredients,
//             appliance: recipe.appliance,
//             ustensils: recipe.ustensils
//         };

//         recipesObject.push(recipeProperty);
//     });

//     const displayAllRecipe = () => {
//         filterByFilter();
//         displayInit();
//     }

//     const filterByFilter = () => {

//         const ingredient = recipe.ingredient;
//         filterByIngredients(ingredient, recipesObject);
//     }

//     const displayInit = () => {
//         const recipesSection = document.querySelector(".recipes-container");
//         recipesSection.innerHTML = '';
//         // eslint-disable-next-line
//         const recipeFactoryFiltered = recipeFactory(recipesObject);

//         recipesObject.forEach((recipe) => {
//             const recipeCard = recipeFactoryFiltered.getRecipeCard(recipe);
//             recipesSection.appendChild(recipeCard);
//         });
//     }

//     const ingredientsSet = new Set();
//     recipes.forEach(recipe => {
//         recipe.ingredients.forEach(ingredient => {
//             ingredientsSet.add(ingredient.ingredient);
//         });
//     });

//     function filterByIngredients(ingredient, recipes) {
//         const recipesSection = document.querySelector(".recipes-container");
//         recipesSection.innerHTML = '';

//         const filteredRecipes = recipes.filter(recipe =>
//             recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === ingredient.toLowerCase())
//         );

//         filteredRecipes.forEach(recipeObject => {
//             const recipeFactories = recipeFactory(recipeObject);
//             const recipeCard = recipeFactories.getRecipeCard();
//             recipesSection.appendChild(recipeCard);
//         });
//     }

//     return {
//         recipes, displayAllRecipe, filterByFilter, filterByIngredients
//     }
// }
