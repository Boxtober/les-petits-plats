export function filterRecipes(recipes, query, tags = []) {
    const queryLower = query.toLowerCase();

    return recipes.filter(recipe => {
        // vérifie si la recette correspond à la requête de recherche
        const foundBySearch = recipe.name.toLowerCase().includes(queryLower) ||
            recipe.description.toLowerCase().includes(queryLower) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(queryLower));

        // vérifie si la recette correspond à tous les tags actifs
        const foundByTags = tags.every(tag => {
            const tagLower = tag.toLowerCase();
            const isIngredientTag = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tagLower);
            const isApplianceTag = recipe.appliance.toLowerCase() === tagLower;
            const isUstensilTag = recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tagLower);

            // console.log(`Tag: ${tagLower}, isIngredientTag: ${isIngredientTag}, isApplianceTag: ${isApplianceTag}, isUstensilTag: ${isUstensilTag}`);

            return isIngredientTag || isApplianceTag || isUstensilTag;
        });

        // console.log(`foundbySearch: ${foundBySearch}, foundByTags: ${foundByTags}`);

        return foundBySearch && foundByTags;
    });
}
