export function filterRecipes(recipes, query, tags = []) {
    console.log(recipes)
    return recipes.filter(recipe => {
        const queryLower = query.toLowerCase();

        // Vérifie si le nom, la description, ou les ingrédients correspondent à la requête
        const foundBySearch =
            recipe.name.toLowerCase().includes(queryLower) ||
            recipe.description.toLowerCase().includes(queryLower) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(queryLower));

        // Vérifie si la recette contient tous les tags
        const foundByTags = tags.length === 0 || tags.every(tag => {
            const tagLower = tag.toLowerCase();
            const isIngredientTag = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tagLower);
            const isApplianceTag = recipe.appliance.toLowerCase() === tagLower;
            const isUstensilTag = recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tagLower);

            return isIngredientTag || isApplianceTag || isUstensilTag;
        });

        return foundBySearch && foundByTags;
    });
}
