// export function filterRecipes(recipes, query, tags = []) {
//     //utilise filter pour parcourir et filtrer toutes les recettes
//     return recipes.filter(recipe => {
//         // vérifie si le nom, la description, les ingrédients correspondent à la requête
//         const foundBySearch =
//             recipe.name.toLowerCase().includes(query) ||
//             recipe.description.toLowerCase().includes(query) ||
//             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));

//         const foundByTags = tags.length === 0 || tags.every(tag =>
//             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
//         );

//         return foundBySearch && foundByTags;
//     });
// }


// export function filterRecipes(recipes, query, tags = []) {
//     return recipes.filter(recipe => {
//         // Vérifie si le nom, la description, ou les ingrédients correspondent à la requête
//         const foundBySearch =
//             recipe.name.toLowerCase().includes(query) ||
//             recipe.description.toLowerCase().includes(query) ||
//             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));


//         // Vérifie si la recette contient tous les tags d'ingrédients
//         const foundByIngredientTags = tags.length === 0 || tags.every(tag =>
//             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
//         );

//         // Vérifie si la recette contient tous les tags d'appareils
//         const foundByApplianceTags = tags.length === 0 || tags.every(tag =>
//             recipe.appliance(recipe => recipe.appliance.toLowerCase() === tag.toLowerCase())
//         );
//         console.log('foundByApplianceTags', foundByApplianceTags)
//         return foundBySearch && foundByIngredientTags && foundByApplianceTags;
//     });
// }



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
