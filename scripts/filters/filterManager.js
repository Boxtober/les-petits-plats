import { ingredientsFilter } from './ingredientsFilter.js';
import { appliancesFilter } from './appliancesFilter.js';
import { ustensilsFilter } from './ustensilsFilter.js';

export function manageFilter(recipes, onTagSelect) {
    const activeTags = new Set();

    ingredientsFilter(recipes, onTagSelect, activeTags);
    appliancesFilter(recipes, onTagSelect, activeTags);
    ustensilsFilter(recipes, onTagSelect, activeTags);
}