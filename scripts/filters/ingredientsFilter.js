
// Déclarer activeTags en dehors de la fonction pour la rendre globale
const activeTags = new Set();

export function ingredientsFilter(recipes, onTagSelect) {

    // Récupère les ingrédients
    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient);
        });
    });

    const ingredientListContainer = document.getElementById('ingredientList');
    ingredientListContainer.innerHTML = '';

    /***Ajout liste ingrédients dans dropdown ***/
    ingredientsSet.forEach(ingredient => {
        const a = document.createElement('a');
        a.href = "#";
        a.className = "dropdown-list block";
        a.textContent = ingredient;

        // Réapplique la classe `active-tag` si l'ingrédient est déjà actif

        if (activeTags.has(ingredient)) {
            a.classList.add('active-tag');

            // Ajoute le bouton de suppression si l'ingrédient est déjà actif
            const removeActiveBtn = document.createElement('button');
            removeActiveBtn.className = 'remove-active-btn';
            removeActiveBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
                    <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;

            removeActiveBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                a.classList.remove('active-tag');
                removeTag(ingredient);
                activeTags.delete(ingredient);
                removeActiveBtn.remove();
                onTagSelect(Array.from(activeTags));
            });

            a.appendChild(removeActiveBtn);
        }

        a.addEventListener('click', (e) => {
            e.preventDefault();
            if (!a.classList.contains('active-tag')) {
                a.classList.add('active-tag');

                // Ajoute le bouton de suppression
                const removeActiveBtn = document.createElement('button');
                removeActiveBtn.className = 'remove-active-btn';
                removeActiveBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
                        <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`;

                removeActiveBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    a.classList.remove('active-tag');
                    removeTag(ingredient);
                    activeTags.delete(ingredient);
                    removeActiveBtn.remove();
                    onTagSelect(Array.from(activeTags));


                });

                a.appendChild(removeActiveBtn);
                createTag(ingredient);
                activeTags.add(ingredient);
            } else {
                a.classList.remove('active-tag');
                removeTag(ingredient);
                activeTags.delete(ingredient);
                const removeButton = a.querySelector('.remove-active-btn');
                if (removeButton) removeButton.remove();
            }
            onTagSelect(Array.from(activeTags));
        });
        ingredientListContainer.appendChild(a);
    });

    // Compare la valeur de l'input pour afficher ou cacher les ingrédients dans la liste
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

    function createTag(ingredientName) {
        const tagContainer = document.querySelector('.tags-container');
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = ingredientName;

        // Ajoutez un attribut pour lier le tag au lien <a>
        tag.setAttribute('data-ingredient', ingredientName);

        const closeButton = document.createElement('button');
        closeButton.className = 'ml-2 text-gray-500 hover:text-gray-700';
        closeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
            <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        closeButton.addEventListener('click', () => {
            removeTag(ingredientName);
            activeTags.delete(ingredientName);
            tag.remove();
            onTagSelect(Array.from(activeTags));
        });

        tag.appendChild(closeButton);
        tagContainer.appendChild(tag);
    }


    function removeTag(ingredientName) {
        // Supprime le tag du container de tags
        const tags = document.querySelectorAll('.tags-container .tag');
        tags.forEach(tag => {
            if (tag.getAttribute('data-ingredient') === ingredientName) {
                tag.remove();
            }
        });

        // Supprime la classe active-tag de l'élément <a> correspondant
        const dropdownItems = document.querySelectorAll('#ingredientList a');
        dropdownItems.forEach(item => {
            if (item.textContent.trim() === ingredientName) {  // trim() enlève les espaces dans la valeur de l'ingrédient
                item.classList.remove('active-tag');
                const removeButton = item.querySelector('.remove-active-btn');
                if (removeButton) removeButton.remove();
            }
        });
    }
}



/****************************************************************************** */


// // Déclarer activeTags en dehors de la fonction pour la rendre globale
// const activeTags = new Set();

// export function ingredientsFilter(recipes, onTagSelect) {

//     // recupère les ingredients
//     const ingredientsSet = new Set();
//     recipes.forEach(recipe => {
//         recipe.ingredients.forEach(ingredient => {
//             ingredientsSet.add(ingredient.ingredient);
//         });
//     });

//     const ingredientListContainer = document.getElementById('ingredientList');
//     ingredientListContainer.innerHTML = '';

//     /************************ ajoute la liste d'ingredients dans le dropdown **************************/
//     ingredientsSet.forEach(ingredient => {
//         const a = document.createElement('a');
//         a.href = "#";
//         a.className = "dropdown-list block";
//         a.textContent = ingredient;

//         // Réapplique la classe `active-tag` si l'ingrédient est déjà actif
//         if (activeTags.has(ingredient)) {
//             a.classList.add('active-tag');
//         }

//         a.addEventListener('click', (e) => {
//             e.preventDefault();
//             if (!a.classList.contains('active-tag')) {
//                 a.classList.add('active-tag');

//                 //ajout du bouton qui supprime la classe active
//                 const removeActiveBtn = document.createElement('button');
//                 removeActiveBtn.className = 'remove-active-btn';
//                 removeActiveBtn.innerHTML = `
//                     <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
//                         <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
//                         <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
//                     </svg>`;

//                 removeActiveBtn.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     a.classList.remove('active-tag');
//                     removeTag(ingredient);
//                     activeTags.delete(ingredient);
//                     removeActiveBtn.remove();
//                     onTagSelect(Array.from(activeTags));
//                 });

//                 a.appendChild(removeActiveBtn);
//                 createTag(ingredient);
//                 activeTags.add(ingredient);
//             } else {
//                 a.classList.remove('active-tag');
//                 removeTag(ingredient);
//                 activeTags.delete(ingredient);
//                 const removeButton = a.querySelector('.remove-active-btn');
//                 if (removeButton) removeButton.remove();
//             }
//             onTagSelect(Array.from(activeTags));
//         });
//         ingredientListContainer.appendChild(a);
//     });

//     // compare la valeur de l'input pour afficher ou cacher les ingredient dans la liste
//     const searchInputIngredients = document.getElementById('searchInputIngredients');
//     searchInputIngredients.addEventListener('input', function () {
//         const searchTerm = this.value.toLowerCase();
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

//     function createTag(ingredientName) {
//         const tagContainer = document.querySelector('.tags-container');
//         const tag = document.createElement('div');
//         tag.className = 'tag';
//         tag.textContent = ingredientName;

//         // Ajoutez un attribut pour lier le tag au lien <a>
//         tag.setAttribute('data-ingredient', ingredientName);

//         const closeButton = document.createElement('button');
//         closeButton.className = 'ml-2 text-gray-500 hover:text-gray-700';
//         closeButton.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
//             <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
//             </svg>
//         `;

//         closeButton.addEventListener('click', () => {
//             removeTag(ingredientName);
//             activeTags.delete(ingredientName);
//             tag.remove();
//             onTagSelect(Array.from(activeTags));
//         });

//         tag.appendChild(closeButton);
//         tagContainer.appendChild(tag);
//     }


//     function removeTag(ingredientName) {
//         // supprime le tag du container de tags
//         const tags = document.querySelectorAll('.tags-container .tag');
//         tags.forEach(tag => {
//             if (tag.getAttribute('data-ingredient') === ingredientName) {
//                 tag.remove();
//             }
//         });

//         // supprime la classe active-tag de l'élément <a> correspondant
//         const dropdownItems = document.querySelectorAll('#ingredientList a');
//         dropdownItems.forEach(item => {
//             if (item.textContent.trim() === ingredientName) {  // trim() enleve les espaces dans la valeur du de l'ingredient
//                 item.classList.remove('active-tag');
//                 const removeButton = item.querySelector('.remove-active-btn');
//                 if (removeButton) removeButton.remove();
//             }
//         });
//     }
// }











/****************************************************************************** */





// export function ingredientsFilter(recipes, onTagSelect) {

//     // recupère les ingredients
//     const ingredientsSet = new Set();
//     recipes.forEach(recipe => {
//         recipe.ingredients.forEach(ingredient => {
//             ingredientsSet.add(ingredient.ingredient);
//         });
//     });

//     const ingredientListContainer = document.getElementById('ingredientList');
//     ingredientListContainer.innerHTML = '';

//     const activeTags = new Set();

//     /************************ ajoute la liste d'ingredients dans le dropdown **************************/
//     ingredientsSet.forEach(ingredient => {
//         const a = document.createElement('a');
//         a.href = "#";
//         a.className = "dropdown-list block";
//         a.textContent = ingredient;
//         a.addEventListener('click', (e) => {
//             e.preventDefault();
//             if (!a.classList.contains('active-tag')) {
//                 a.classList.add('active-tag');
//                 console.log('active-tag added:', a);
//                 //ajout du bouton qui supprime la classe active
//                 const removeActiveBtn = document.createElement('button');
//                 removeActiveBtn.className = 'remove-active-btn';
//                 removeActiveBtn.innerHTML = `
//                     <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
//                         <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
//                         <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
//                     </svg>`;

//                 removeActiveBtn.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     a.classList.remove('active-tag');
//                     removeTag(ingredient);
//                     activeTags.delete(ingredient);
//                     removeActiveBtn.remove();
//                     onTagSelect(Array.from(activeTags));
//                 });

//                 a.appendChild(removeActiveBtn);
//                 createTag(ingredient);
//                 activeTags.add(ingredient);
//             } else {
//                 a.classList.remove('active-tag');
//                 removeTag(ingredient);
//                 activeTags.delete(ingredient);
//                 const removeButton = a.querySelector('.remove-active-btn');
//                 if (removeButton) removeButton.remove();
//             }
//             onTagSelect(Array.from(activeTags));
//         });
//         ingredientListContainer.appendChild(a);
//     });

//     // compare la valeur de l'input pour afficher ou cacher les ingredient dans la liste
//     const searchInputIngredients = document.getElementById('searchInputIngredients');
//     searchInputIngredients.addEventListener('input', function () {
//         const searchTerm = this.value.toLowerCase();
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

//     function createTag(ingredientName) {
//         const tagContainer = document.querySelector('.tags-container');
//         const tag = document.createElement('div');
//         tag.className = 'tag';
//         tag.textContent = ingredientName;

//         // Ajoutez un attribut pour lier le tag au lien <a>
//         tag.setAttribute('data-ingredient', ingredientName);

//         const closeButton = document.createElement('button');
//         closeButton.className = 'ml-2 text-gray-500 hover:text-gray-700';
//         closeButton.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
//             <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
//             </svg>
//         `;

//         closeButton.addEventListener('click', () => {
//             removeTag(ingredientName);
//             activeTags.delete(ingredientName);
//             tag.remove();
//             onTagSelect(Array.from(activeTags));
//         });

//         tag.appendChild(closeButton);
//         tagContainer.appendChild(tag);
//     }


//     function removeTag(ingredientName) {
//         // supprime le tag du container de tags
//         const tags = document.querySelectorAll('.tags-container .tag');
//         tags.forEach(tag => {
//             if (tag.getAttribute('data-ingredient') === ingredientName) {
//                 tag.remove();
//             }
//         });

//         // supprime la classe active-tag de l'élément <a> correspondant
//         const dropdownItems = document.querySelectorAll('#ingredientList a');
//         dropdownItems.forEach(item => {
//             if (item.textContent.trim() === ingredientName) {  // trim() enleve les espaces dans la valeur du de l'ingredient
//                 item.classList.remove('active-tag');
//                 const removeButton = item.querySelector('.remove-active-btn');
//                 if (removeButton) removeButton.remove();
//             }
//         });
//     }
// }
