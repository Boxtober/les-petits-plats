function initDropdown(recipes) {

    //recupere uniquement les ingredients
    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient);
        });
    });

    //crée les elements <a> des ingredients
    const ingredientListContainer = document.getElementById('ingredientList');
    ingredientsSet.forEach(ingredient => {
        const a = document.createElement('a');
        a.href = "#";
        a.className = "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100";
        a.textContent = ingredient;
        a.addEventListener('click', (e) => {
            e.preventDefault();

            //ajoute une classe active
            a.classList.add('active-tag');

            //ajout du bouton qui supprime la classe active
            const removeActiveBtn = document.createElement('button');
            removeActiveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
            <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;
            removeActiveBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                a.classList.remove('active-tag');
                a.removeChild(removeActiveBtn); // Retire le bouton
                // deleteTag() --> Faire une fonction qui supprime le tag
            });

            a.appendChild(removeActiveBtn);

            // affiche les recette contenant les ingredients cliqués
            displayByIngredient(ingredient, recipes);

            // cree le tag de l'ingredient
            createTag(ingredient);
        });

        ingredientListContainer.appendChild(a);
    });

    // affiche / ferme le dropdown
    document.getElementById('menuButton').addEventListener('click', () => {
        document.getElementById('menuItems').classList.toggle('hidden');
    });

    // compare la valeur de l'input pour afficher ou cacher les ingredient dans la liste

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const searchTerm = this.value.toLowerCase();
        // "this.value" fait reference à la valeur de l'input
        console.log(searchTerm)
        const items = document.querySelectorAll('#ingredientList a');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });

    // document.getElementById('searchInput').addEventListener('input', function () {

    //     const searchTerm = this.value.toLowerCase();
    //     // "this.value" fait reference à la valeur de l'input
    //     console.log(searchTerm)
    //     const items = document.querySelectorAll('#ingredientList a');
    //     items.forEach(item => {
    //         const text = item.textContent.toLowerCase();
    //         if (text.includes(searchTerm)) {
    //             item.classList.remove('hidden');
    //         } else {
    //             item.classList.add('hidden');
    //         }
    //     });
    // });



    //ferme le dropdown si on clique ailleurs sur la page
    // document.addEventListener('click', () => {
    //     const isClickInside = document.querySelector('.relative.inline-block.text-left');
    //     if (!isClickInside) {
    //         document.getElementById('menuItems').classList.add('hidden');
    //     }
    // });

    // crée les tags pour les ingrédients sélectionnés
    function createTag(ingredientName) {

        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = ingredientName;

        const closeButton = document.createElement('button');
        closeButton.className = 'ml-2 text-gray-500 hover:text-gray-700';
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
        <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;

        closeButton.addEventListener('click', () => {
            tag.remove();

            // removeFilter(); --> faire une fonction pour annuler le filtre et supprimer le tag
        });

        tag.appendChild(closeButton);
        document.querySelector('.tags-container').appendChild(tag);
    }
}

// affiche les recettes filté par ingredients
function displayByIngredient(ingredient, recipes) {
    const recipesSection = document.querySelector(".recipes-container");
    recipesSection.innerHTML = '';

    const filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === ingredient.toLowerCase())
    );

    filteredRecipes.forEach(recipeObject => {
        const recipeFactories = recipeFactory(recipeObject);
        const recipeCard = recipeFactories.getRecipeCard();
        recipesSection.appendChild(recipeCard);
    });
}


