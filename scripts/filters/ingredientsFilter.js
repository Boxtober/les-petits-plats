import { createTag, removeTag } from '../tags.js';

// Déclarer activeTags en dehors de la fonction pour la rendre globale
const activeTags = new Set(); // stocke les tags actifs
let filter = 'ingredient'; // ici filter est bien = à ingredients


export function ingredientsFilter(recipes, onTagSelect) {
    // Récupère les ingrédients et stock dans un objet set
    const ingredientsSet = new Set();

    // Récupére tous les ingrédients de chaque recettes
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient);  // Ajout de l'ingrédient au Set
        });
    });

    const ingredientListContainer = document.getElementById('ingredientList');
    ingredientListContainer.textContent = '';

    // Ajout liste d'ingrédients dans dropdown
    ingredientsSet.forEach(ingredient => {
        const a = document.createElement('a');
        a.href = "#";
        a.className = "dropdown-list block";
        a.textContent = ingredient;

        // SI ingrédient déjà actif
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

            // Event click sur le bouton
            removeActiveBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Empêche la propagation de l'événement au parent
                a.classList.remove('active-tag'); // Supprime la classe active
                removeTag(ingredient, filter); // Supprime le tag via la fonction removeTag
                activeTags.delete(ingredient); // Retire l'ingrédient du Set des tags actifs
                removeActiveBtn.remove(); // Supprime le bouton de suppression
                onTagSelect(Array.from(activeTags)); // Met à jour les tags sélectionnés
            });

            a.appendChild(removeActiveBtn);
        }

        // Event click sur le lien d'ingrédient
        a.addEventListener('click', (e) => {
            e.preventDefault();
            // si l'element ne possede pas la class active-tag
            if (!a.classList.contains('active-tag')) {
                a.classList.add('active-tag'); // Ajoute la classe active

                // Ajoute le bouton de suppression
                const removeActiveBtn = document.createElement('button');
                removeActiveBtn.className = 'remove-active-btn';
                removeActiveBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
                    <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;

                // Event click sur le bouton de suppression
                removeActiveBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    a.classList.remove('active-tag');
                    removeTag(ingredient, filter);
                    activeTags.delete(ingredient);
                    removeActiveBtn.remove();
                    onTagSelect(Array.from(activeTags));
                });


                a.appendChild(removeActiveBtn); // Ajoute btn de suppression à l'élément lien
                createTag(ingredient, activeTags, onTagSelect, filter);  // Crée un tag pour cet ingrédient actif
                activeTags.add(ingredient); // Ajoute l'ingrédient au Set des tags actifs

            } else {
                // Si l'ingrédient est déjà actif, on désactive
                a.classList.remove('active-tag'); // Supprime la classe active
                removeTag(ingredient, filter); // Supprime le tag
                activeTags.delete(ingredient);  // Retire l'ingrédient du Set des tags actifs
                const removeButton = a.querySelector('.remove-active-btn');
                if (removeButton) removeButton.remove();  // Supprime le bouton de suppression si trouvé
            }
            onTagSelect(Array.from(activeTags)); // Met à jour les tags sélectionnés après chaque interaction

        });
        ingredientListContainer.appendChild(a); // Ajoute élément lien de l'ingrédient
    });

    // Compare la valeur de l'input pour afficher ou cacher les ingrédients dans la liste
    const searchInputIngredients = document.getElementById('searchInputIngredients');
    searchInputIngredients.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase(); // Récupère valeur de l'input en minuscules
        const items = document.querySelectorAll('#ingredientList a'); // Sélectionne tous les liens
        items.forEach(item => {
            const text = item.textContent.toLowerCase(); // Récupère le texte de chaque élément
            // Affiche ou cache les éléments en fonction de la recherche
            if (text.includes(searchTerm)) {
                item.classList.remove('hidden'); // Affiche l'élément si le terme est trouvé
            } else {
                item.classList.add('hidden'); // Cache l'élément si le terme n'est pas trouvé
            }
        });
    });

    return activeTags; // Retourne l'ensemble des tags actifs
}
