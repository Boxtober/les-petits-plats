
const activeTags = new Set();

export function appliancesFilter(recipes, onTagSelect) {
    const appliancesSet = new Set();
    // recipes.forEach(recipe => {
    //     recipe.appliances.forEach(appliance => {
    //         appliancesSet.add(appliance);
    //     })
    // });

    recipes.forEach(recipe => {
        // Vérifiez que `recipe.appliance` est défini et n'est pas vide
        if (recipe.appliance) {
            // Ajoutez l'appliance directement, car ce n'est pas un tableau
            appliancesSet.add(recipe.appliance);
        }
    });

    const applianceListContainer = document.getElementById('applianceList');
    applianceListContainer.innerHTML = '';

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
                removeTag(appliance);
                activeTags.delete(appliance);
                removeActiveBtn.remove();
                onTagSelect(Array.from(activeTags));
            });

            a.appendChild(removeActiveBtn);
        }

        a.addEventListener('click', (e) => {
            e.preventDefault();
            //  console.log(recipes);
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
                    removeTag(appliance);
                    activeTags.delete(appliance);
                    removeActiveBtn.remove();
                    onTagSelect(Array.from(activeTags));
                });

                a.appendChild(removeActiveBtn);
                createTag(appliance);
                activeTags.add(appliance);
            } else {
                a.classList.remove('active-tag');
                removeTag(appliance);
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

    function createTag(applianceName) {
        const tagContainer = document.querySelector('.tags-container');
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = applianceName;


        tag.setAttribute('data-appliance', applianceName);

        const closeButton = document.createElement('button');
        closeButton.className = 'ml-2 text-gray-500 hover:text-gray-700';
        closeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
            <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

        closeButton.addEventListener('click', () => {
            removeTag(applianceName);
            activeTags.delete(applianceName);
            tag.remove();
            onTagSelect(Array.from(activeTags));
        });

        tag.appendChild(closeButton);
        tagContainer.appendChild(tag);
    }

    function removeTag(applianceName) {
        const tags = document.querySelectorAll('.tags-container .tag');
        tags.forEach(tag => {
            if (tag.getAttribute('data-appliance') === applianceName) {
                tag.remove();
            }
        });

        const dropdownItems = document.querySelectorAll('#applianceList a');
        dropdownItems.forEach(item => {
            if (item.textContent.trim() === applianceName) {
                item.classList.remove('active-tag');
                const removeButton = item.querySelector('.remove-active-btn');
                if (removeButton) removeButton.remove();
            }
        });
    }
}