import { createTag, removeTag } from '../tags.js';

// Déclarer activeTags en dehors de la fonction pour la rendre globale
const activeTags = new Set();
let filter = 'ustensil';

export function ustensilsFilter(recipes, onTagSelect) {

    // recupère les ustensils
    const ustensilsSet = new Set();
    recipes.forEach(recipe => {

        recipe.ustensils.forEach(ustensil => {
            ustensilsSet.add(ustensil); // ajout de chaque ustensile au Set
        });

    });

    const ustensilListContainer = document.getElementById('ustensilList');
    ustensilListContainer.textContent = '';

    /***Ajout liste ustensils dans dropdown ***/
    ustensilsSet.forEach(ustensil => {
        const a = document.createElement('a');
        a.href = "#";
        a.className = "dropdown-list block";
        a.textContent = ustensil;

        // Réapplique la classe `active-tag` si l'ingrédient est déjà actif

        if (activeTags.has(ustensil)) {
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
                removeTag(ustensil, filter);
                activeTags.delete(ustensil);
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
                    removeTag(ustensil, filter);
                    activeTags.delete(ustensil);
                    removeActiveBtn.remove();
                    onTagSelect(Array.from(activeTags));
                });

                a.appendChild(removeActiveBtn);
                createTag(ustensil, activeTags, onTagSelect, filter);
                activeTags.add(ustensil);

            } else {
                a.classList.remove('active-tag');
                removeTag(ustensil, 'ustensil');
                activeTags.delete(ustensil);
                const removeButton = a.querySelector('.remove-active-btn');
                if (removeButton) removeButton.remove();
            }
            onTagSelect(Array.from(activeTags));
        });
        ustensilListContainer.appendChild(a);
    });

    // compare la valeur de l'input pour afficher ou cacher les ustensil dans la liste
    const searchInputUstensils = document.getElementById('searchInputUstensils');
    searchInputUstensils.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const items = document.querySelectorAll('#ustensilList a');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });

    return activeTags;
}


