async function initRecipePage() {

    const { recipes } = await getRecipes();
    const recipeFactoryInstance = recipeByFilterFactory(recipes);
    recipeFactoryInstance.displayAllRecipe();
    initDropdown(recipes);

}

initRecipePage();


// recherche dans titre description ingredients
// actualise tag
// avec for : 2versions -> natif/fonctionnel

// async function initRecipePage() {
//     const url = new URL(window.location.href);
//     const id = url.searchParams.get('id');

//     const { recipes } = await getRecipes();

//     const recipeFactory = recipeByFilterFactory(recipes);
//     recipeFactory.displayAllRecipe();
// }

// initRecipePage();
