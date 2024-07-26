function recipeByFilterFactory(recipes) {
    // const recipes = recipes;
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const recipesSection = document.querySelector('.recipes-container');

    const displayAllRecipe = () => {
        displayRecipes(recipes);
    }


    // let activeTags = [];

    // const filterRecipesByTags = (recipes, tags) => {
    //     if (tags.length === 0) {
    //         return recipes;
    //     }

    //     return recipes.filter(recipe => {
    //         return tags.every(tag =>
    //             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag))
    //         );
    //     });
    // };

    const filterRecipes = (query) => {
        //utilise filter pour parcourir et filtrer toutes les recettes
        const filteredRecipes = recipes.filter(recipe => {
            // vérifie si le nom, la description, les ingrédients correspondent à la requête
            const foundInName = recipe.name.toLowerCase().includes(query);
            const foundInDescription = recipe.description.toLowerCase().includes(query);
            const foundInIngredients = recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(query)
            );
            return foundInName || foundInDescription || foundInIngredients;
        });

        // const finalFilteredRecipes = filterRecipesByTags(filteredRecipes, activeTags);
        // displayRecipes(finalFilteredRecipes);

        // affiche les recettes filtrées
        displayRecipes(filteredRecipes); //<-- filtré à nouveau sur filteredrecipes
    }

    const displayRecipes = (recipesToDisplay) => {
        // efface le contenu en cours
        recipesSection.innerHTML = '';
        //recupere la valeur du champ utilisateur
        const inputValue = searchInput.value.trim();

        if (recipesToDisplay.length === 0) {
            // Crée un message d'erreur si aucune correspondence n'est trouvé
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            errorMessage.classList.add('error-message');
            recipesSection.appendChild(errorMessage);
        } else {
            //parcours toutes les recettes à afficher et crée une carte pour chaque recette
            recipesToDisplay.forEach(recipe => {
                const recipeCard = recipeFactory(recipe).getRecipeCard();
                recipesSection.appendChild(recipeCard);
            });
        }
    }

    //event sur le champ de recherche pour mettre à jour les résultat
    searchInput.addEventListener('input', () => {

        //recupere la valeur du champ utilisateur
        const query = searchInput.value.trim().toLowerCase();

        // filtre uniquement si la valeur est += 3 caracteres
        if (query.length >= 3) {
            filterRecipes(query);
        } else {
            // Sinon affiche toutes les recettes
            displayRecipes(recipes);
        }
    });

    // ajout event submit au formulaire
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (query.length >= 3) {
            filterRecipes(query);
        } else {
            displayRecipes(recipes);
        }
    });

    return {
        recipes, displayAllRecipe, displayRecipes, filterRecipes
    };
}
