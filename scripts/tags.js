export function createTag(typeOfTag, activeTags, onTagSelect, filter) {
    const tagContainer = document.querySelector('.tags-container');
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = typeOfTag;

    // Ajoutez un attribut pour lier le tag au lien <a>
    tag.setAttribute(`data-${filter}`, typeOfTag);

    const closeButton = document.createElement('button');
    closeButton.className = 'ml-2 text-gray-500 hover:text-gray-700';
    closeButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;

    closeButton.addEventListener('click', () => {
        removeTag(typeOfTag, filter);
        activeTags.delete(typeOfTag);
        tag.remove();
        onTagSelect(Array.from(activeTags));
    });

    tag.appendChild(closeButton);
    tagContainer.appendChild(tag);

}

export function removeTag(typeOfTag, filter) {

    const tags = document.querySelectorAll('.tags-container .tag');

    tags.forEach(tag => {
        if (tag.getAttribute(`data-${filter}`) === typeOfTag) {
            tag.remove();
        }
    });

    let dropdownItems = document.querySelectorAll(`#${filter}List a`);

    dropdownItems.forEach(item => {
        if (item.textContent.trim() === typeOfTag) {// trim() enleve les espaces dans la valeur du de l'ustensil
            item.classList.remove('active-tag');
            const removeButton = item.querySelector('.remove-active-btn');
            if (removeButton) removeButton.remove();
        }

    });
}
