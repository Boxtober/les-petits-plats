export function filterRecipes(recipes, query, tags = []) {
    //utilise filter pour parcourir et filtrer toutes les recettes
    return recipes.filter(recipe => {
        // vérifie si le nom, la description, les ingrédients correspondent à la requête
        const foundBySearch =
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));

        const foundByTags = tags.length === 0 || tags.every(tag =>
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
        );

        return foundBySearch && foundByTags;
    });
}
