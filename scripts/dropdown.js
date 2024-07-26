function initDropdown(recipes) {
    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient);
        });
    });

    const ingredientListContainer = document.getElementById('ingredientList');

    ingredientsSet.forEach(ingredient => {
        const a = document.createElement('a'); // Assurez-vous que 'a' est défini ici
        a.href = "#";
        a.className = "dropdown-list block";
        a.textContent = ingredient;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            if (!a.classList.contains('active-tag')) {
                a.classList.add('active-tag');

                const removeActiveBtn = document.createElement('button');
                removeActiveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
                <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;

                removeActiveBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    a.classList.remove('active-tag');
                    a.removeChild(removeActiveBtn);
                    activeTags = activeTags.filter(tag => tag !== ingredient.toLowerCase());
                    filterRecipes(searchInput.value.trim().toLowerCase());
                });

                a.appendChild(removeActiveBtn);
                activeTags.push(ingredient.toLowerCase());
                filterRecipes(searchInput.value.trim().toLowerCase());
            }
        });

        ingredientListContainer.appendChild(a);
    });

    // affiche / ferme le dropdown
    document.getElementById('menuButton').addEventListener('click', () => {
        const menuItems = document.getElementById('menuItems');
        const menuButton = document.getElementById('menuButton');

        menuItems.classList.toggle('hidden');
        const isOpen = !menuItems.classList.contains('hidden');

        if (isOpen) {
            menuButton.classList.add('menu-open');
        } else {
            menuButton.classList.remove('menu-open');
        }
    });

    // compare la valeur de l'input pour afficher ou cacher les ingredient dans la liste
    const searchInputIngredients = document.getElementById('searchInputIngredients');
    searchInputIngredients.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
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
}



// function initDropdown(recipes) {

//     const ingredientsSet = new Set();
//     recipes.forEach(recipe => {
//         recipe.ingredients.forEach(ingredient => {
//             ingredientsSet.add(ingredient.ingredient);
//         });
//     });

//     const ingredientListContainer = document.getElementById('ingredientList');

//     ingredientsSet.forEach(ingredient => {
//         const a = document.createElement('a');
//         a.href = "#";
//         a.className = "dropdown-list block";
//         a.textContent = ingredient;
//         a.addEventListener('click', (e) => {
//             e.preventDefault();
//             if (!a.classList.contains('active-tag')) {

//                 //ajoute une classe active
//                 a.classList.add('active-tag');

//                 //ajout du bouton qui supprime la classe active
//                 const removeActiveBtn = document.createElement('button');
//                 removeActiveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
//                 <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
//                 <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`;

//                 removeActiveBtn.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     a.classList.remove('active-tag');
//                     a.removeChild(removeActiveBtn); // Retire le bouton
//                     // deleteTag() --> Faire une fonction qui supprime le tag
//                 });

//                 a.appendChild(removeActiveBtn);
//                 createTag(ingredient);

//             }
//         });

//         ingredientListContainer.appendChild(a);

//         function createTag(ingredientName) {
//             const tag = document.createElement('div');
//             tag.className = 'tag';
//             tag.textContent = ingredientName;

//             const closeButton = document.createElement('button');
//             closeButton.className = 'ml-2 text-gray-500 hover:text-gray-700';
//             closeButton.innerHTML = `
//                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
//                 <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//             `;


//             closeButton.addEventListener('click', () => {
//                 tag.remove();
//                 // removeFilter(); --> faire une fonction pour annuler le filtre et supprimer le tag
//             });

//             tag.appendChild(closeButton);
//             document.querySelector('.tags-container').appendChild(tag);
//         }
//     });

//     // affiche / ferme le dropdown
//     document.getElementById('menuButton').addEventListener('click', () => {

//         //document.getElementById('menuItems').classList.toggle('hidden');

//         const menuItems = document.getElementById('menuItems');
//         const menuButton = document.getElementById('menuButton');

//         menuItems.classList.toggle('hidden');
//         const isOpen = !menuItems.classList.contains('hidden');

//         if (isOpen) {
//             menuButton.classList.add('menu-open');
//         } else {
//             menuButton.classList.remove('menu-open');
//         }

//     });

//     // compare la valeur de l'input pour afficher ou cacher les ingredient dans la liste
//     const searchInputIngredients = document.getElementById('searchInputIngredients');

//     searchInputIngredients.addEventListener('input', function () {
//         const searchTerm = this.value.toLowerCase();
//         console.log(searchTerm)
//         const items = document.querySelectorAll('#ingredientList a');
//         items.forEach(item => {
//             const text = item.textContent.toLowerCase();
//             if (text.includes(searchTerm)) {
//                 item.classList.remove('hidden');
//             } else {
//                 item.classList.add('hidden');
//             }
//         });
//     });

// }


