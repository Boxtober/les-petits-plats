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
        displayInit();
    }

    const displayInit = () => {
        const recipesSection = document.querySelector(".recipes-container");
        recipesSection.innerHTML = '';

        recipesObject.forEach((recipe) => {
            const recipeFactoryFiltered = recipeFactory(recipe);
            const recipeCard = recipeFactoryFiltered.getRecipeCard();
            recipesSection.appendChild(recipeCard);
        });
    }

    // displayBySearch(recipes) {
    //     const searchRecipes = document.querySelector(".search-recipes");
    //     const recipesItems = 
    // }

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const recipesSection = document.querySelector('.recipes-container');

    function filterRecipes(query) {

        let filteredRecipes = []; // stocke les recettes filtrés dans un tableau

        //parcours toutes les recettes
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            //boolean pour indiquer si la recette est trouvé ou non
            let found = false;


            // verifie si un nom est trouvé
            if (recipe.name.toLowerCase().indexOf(query) !== -1) {
                found = true;
            }
            // verifie si une description est trouvé
            else if (recipe.description.toLowerCase().indexOf(query) !== -1) {
                found = true;
                // verifie si un ingredient est trouvé
            } else {
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    if (recipe.ingredients[j].ingredient.toLowerCase().indexOf(query) !== -1) {
                        found = true;
                        // sort de la boucle si quelque chose est trouvé
                        break;
                    }
                }
            }
            // si found = true, pousse la recette dans le tableau de recettes filtrés
            if (found) {
                filteredRecipes.push(recipe);
            }
        }
        // affiche les recettes
        displayRecipes(filteredRecipes);
    }

    function displayRecipes(recipesToDisplay) {
        // efface le contenu en cours
        recipesSection.innerHTML = '';
        //recupere la valeur du champ utilisateur
        let inputValue = searchInput.value;

        if (recipesToDisplay.length === 0) {
            // Crée un message d'erreur
            let errorMessage = document.createElement('p');
            errorMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            errorMessage.classList.add('error-message');
            recipesSection.appendChild(errorMessage);
        } else {
            //parcours toutes les recettes à afficher
            for (let i = 0; i < recipesToDisplay.length; i++) {
                //crée une carte pour chaques recettes
                let recipeCard = recipeFactory(recipesToDisplay[i]).getRecipeCard();
                recipesSection.appendChild(recipeCard);
            }
        }
    }

    // event sur le champ de recherche pour mettre à jour les résultat
    searchInput.addEventListener('input', function () {

        //recupere la valeur du champ utilisateur
        let query = searchInput.value.trim();

        // filtre uniquement st la valeur est += 3 caracteres
        if (query.length >= 3) {
            filterRecipes(query);
        } else {
            // Sinon, affiche toutes les recettes
            displayRecipes(recipes, query);
        }
    });

    // ajout event submit au formulaire
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // //recupere la valeur du champ utilisateur
        // let query = searchInput.value.trim();

        // // filtre uniquement st la valeur est += 3 caracteres
        // if (query.length >= 3) {
        //     filterRecipes(query);
        // }
    });


    // const filterRecipes = (query) => {
    //     const filteredRecipes = recipes.filter(recipe => {
    //         return (
    //             recipe.name.toLowerCase().includes(query) ||
    //             recipe.description.toLowerCase().includes(query) ||
    //             recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query))
    //         );
    //     });

    //     displayRecipes(filteredRecipes);
    // };

    // const displayRecipes = (recipesToDisplay) => {
    //     recipesSection.innerHTML = '';
    //     recipesToDisplay.forEach(recipe => {
    //         const recipeCard = recipeFactory(recipe).getRecipeCard();
    //         recipesSection.appendChild(recipeCard);
    //     });
    // };

    // searchForm.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     const query = searchInput.value.trim().toLowerCase();
    //     if (query.length >= 3) {
    //         filterRecipes(query);
    //     }
    // });

    return {
        recipes, displayAllRecipe, displayRecipes, filterRecipes
    }
}




//*******************************************************************************

//*                                       VERSION NATIVE 

//*******************************************************************************


function recipeByFilterFactory(recipes) {

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const recipesSection = document.querySelector('.recipes-container');


    const displayAllRecipe = () => {
        displayRecipes(recipes);
    }

    function filterRecipes(query) {
        // initialise un tableau vide dans lequel on va stocker les recettes
        let filteredRecipes = [];

        //parcours toutes les recettes
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            //boolean pour indiquer si la recette est trouvé ou non
            let found = false;

            // verifie si un nom est trouvé
            if (recipe.name.toLowerCase().indexOf(query) !== -1) {
                found = true;
            }
            // verifie si une description est trouvé
            else if (recipe.description.toLowerCase().indexOf(query) !== -1) {
                found = true;
                // verifie si un ingredient est trouvé
            } else {
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    if (recipe.ingredients[j].ingredient.toLowerCase().indexOf(query) !== -1) {
                        found = true;
                        // sort de la boucle si quelque chose est trouvé
                        break;
                    }
                }
            }
            // si found = true, pousse la recette dans le tableau de recettes filtrés
            if (found) {
                filteredRecipes.push(recipe);
            }
        }
        // affiche les recettes
        displayRecipes(filteredRecipes);
    }

    function displayRecipes(recipesToDisplay) {
        // efface le contenu en cours
        recipesSection.innerHTML = '';
        //recupere la valeur du champ utilisateur
        let inputValue = searchInput.value;

        if (recipesToDisplay.length === 0) {
            // Crée un message d'erreur 
            let errorMessage = document.createElement('p');
            errorMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            errorMessage.classList.add('error-message');
            recipesSection.appendChild(errorMessage);
        } else {
            //parcours toutes les recettes à afficher
            for (let i = 0; i < recipesToDisplay.length; i++) {
                //crée une carte pour chaques recettes
                let recipeCard = recipeFactory(recipesToDisplay[i]).getRecipeCard();
                recipesSection.appendChild(recipeCard);
            }
        }
    }

    // event sur le champ de recherche pour mettre à jour les résultat
    searchInput.addEventListener('input', function () {
        //recupere la valeur du champ utilisateur
        let query = searchInput.value.trim();

        // filtre uniquement si la valeur est += 3 caracteres
        if (query.length >= 3) {
            filterRecipes(query);
        } else {
            // Sinon, affiche toutes les recettes
            displayRecipes(recipes, query);
        }
    });

    // ajout event submit au formulaire
    searchForm.addEventListener('submit', function (e) {
        let query = searchInput.value.trim();

        e.preventDefault();
        if (query.length >= 3) {
            filterRecipes(query);
        } else {
            displayRecipes(recipes, query);
        }
    });

    return {
        recipes, displayAllRecipe, displayRecipes, filterRecipes
    }
}

