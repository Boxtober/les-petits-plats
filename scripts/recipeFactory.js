export function recipeFactory({ id, image, name, ingredients, time, description }) {

    function getRecipeCard() {
        const article = document.createElement('article');
        article.classList.add('recipe-card');

        const link = document.createElement('a');
        link.href = `recette-${id}.html`;
        link.classList.add('relative');

        const span = document.createElement('span');
        span.classList.add('time');
        span.textContent = `${time}min`;

        const img = document.createElement('img');
        img.src = `assets/Photos-Les-petits-plats/${image}`;
        img.alt = name;
        img.classList.add('img-recipes');

        const recipeInfo = document.createElement('div');
        recipeInfo.classList.add('recipe-info');

        const title = document.createElement('h2');
        title.textContent = name;

        const recipeSection = document.createElement('div');
        recipeSection.classList.add('recipe-section');

        const recipeHeading = document.createElement('h3');
        recipeHeading.textContent = 'RECETTE';

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = description;

        recipeSection.appendChild(recipeHeading);
        recipeSection.appendChild(recipeDescription);

        const ingredientsSection = document.createElement('div');
        ingredientsSection.classList.add('ingredients');

        const ingredientsHeading = document.createElement('h3');
        ingredientsHeading.textContent = 'INGRÉDIENTS :';

        const ingredientsList = document.createElement('ul');

        ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.innerHTML = `${ingredient.ingredient}${ingredient.quantity ? `<br><span class="quantity">${ingredient.quantity} ${ingredient.unit || ''}</span>` : ''}`;
            ingredientsList.appendChild(ingredientItem);
        });

        ingredientsSection.appendChild(ingredientsHeading);
        ingredientsSection.appendChild(ingredientsList);

        recipeInfo.appendChild(title);
        recipeInfo.appendChild(recipeSection);
        recipeInfo.appendChild(ingredientsSection);

        link.appendChild(span);
        link.appendChild(img);
        link.appendChild(recipeInfo);

        article.appendChild(link);

        return article;
    }
    return { getRecipeCard };
}