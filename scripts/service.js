async function getRecipes() {
    try {
        const response = await fetch('../data/recipes.json');
        if (!response.ok) {
            throw new Error('Erreur');
        }

        const data = await response.json();
        // console.log(data)
        if (!data || !data.recipes) {
            console.error('Invalid data from JSON:', data);
            return {
                recipes: []
            };
        }

        return {
            recipes: data.recipes,
        };

    } catch (error) {
        console.error(error);

        return {
            recipes: []
        };
    }
}