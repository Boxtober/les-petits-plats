export function filterRecipes(recipes, query, tags = []) {
    return recipes.filter(recipe => {
        // Vérifie si le nom, la description, ou les ingrédients correspondent à la requête
        const foundBySearch =
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));

        // Vérifie si la recette contient tous les tags
        const foundByTags = tags.length === 0 || tags.every(tag => {
            // Vérifie si le tag est un ingrédient dans la recette
            const isIngredientTag = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.toLowerCase());

            // Vérifie si le tag est un appareil correspondant
            const isApplianceTag = recipe.appliance.toLowerCase() === tag.toLowerCase();


            // Vérifie si le tag est un appareil correspondant
            const isUstensilTag = recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tag.toLowerCase());

            return isIngredientTag || isApplianceTag || isUstensilTag;
        });

        return foundBySearch && foundByTags;
    });
}
