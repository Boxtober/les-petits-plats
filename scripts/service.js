export async function getRecipes() {
    try {

        const response = await fetch('data/recipes.json');
        if (!response.ok) {
            throw new Error('Erreur');
        }
        const data = await response.json();
        if (!data || !data.recipes) {
            console.error('Données JSON invalides :', data);
            return { recipes: [] };
        }

        return { recipes: data.recipes };

    } catch (error) {
        console.error('Erreur:', error);
        return { recipes: [] };
    }
}
