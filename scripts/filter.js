export function filterRecipes(recipes, query, tags = []) {
    const queryLower = query.toLowerCase();
    const result = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let foundBySearch = false;

        if (recipe.name.toLowerCase().includes(queryLower) ||
            recipe.description.toLowerCase().includes(queryLower)) {
            foundBySearch = true;
        }

        if (!foundBySearch) {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(queryLower)) {
                    foundBySearch = true;
                    break;
                }
            }
        }

        const foundByTags = tags.every(tag => {
            const tagLower = tag.toLowerCase();
            const isIngredientTag = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tagLower);
            const isApplianceTag = recipe.appliance.toLowerCase() === tagLower;
            const isUstensilTag = recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tagLower);

            return isIngredientTag || isApplianceTag || isUstensilTag;
        });


        if (foundBySearch && foundByTags) {
            result.push(recipe);
        }
    }

    return result;
}
