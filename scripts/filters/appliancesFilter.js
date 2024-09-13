import { createTag, removeTag } from '../tags.js';

const activeTags = new Set();
let filter = 'appliance';
export function appliancesFilter(recipes, onTagSelect) {
    const appliancesSet = new Set();

    recipes.forEach(recipe => {
        // Vérifiez que `recipe.appliance` est défini et n'est pas vide
        if (recipe.appliance) {
            // Ajoutez l'appliance directement, car ce n'est pas un tableau
            appliancesSet.add(recipe.appliance);
        }
    });

    const applianceListContainer = document.getElementById('applianceList');
    applianceListContainer.textContent = '';

    appliancesSet.forEach(appliance => {
        const a = document.createElement('a');
        a.href = "#";
        a.className = "dropdown-list block";
        a.textContent = appliance;

        if (activeTags.has(appliance)) {
            a.classList.add('active-tag');
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
                removeTag(appliance, filter);
                activeTags.delete(appliance);
                removeActiveBtn.remove();
                onTagSelect(Array.from(activeTags));
            });

            a.appendChild(removeActiveBtn);
        }

        a.addEventListener('click', (e) => {
            e.preventDefault();
            if (!a.classList.contains('active-tag')) {
                a.classList.add('active-tag');
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
                    removeTag(appliance, filter);
                    activeTags.delete(appliance);
                    removeActiveBtn.remove();
                    onTagSelect(Array.from(activeTags));
                });

                a.appendChild(removeActiveBtn);
                createTag(appliance, activeTags, onTagSelect, filter);
                activeTags.add(appliance);
            } else {
                a.classList.remove('active-tag');
                removeTag(appliance, filter);
                activeTags.delete(appliance);
                const removeButton = a.querySelector('.remove-active-btn');
                if (removeButton) removeButton.remove();
            }
            onTagSelect(Array.from(activeTags));
        });

        applianceListContainer.appendChild(a);
    });

    const searchInputAppliances = document.getElementById('searchInputAppliance');
    searchInputAppliances.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const items = document.querySelectorAll('#applianceList a');
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