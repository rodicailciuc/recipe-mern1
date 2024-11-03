import express from 'express';

import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } =
    recipeControllers;

const router = express.Router();

// routes
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipe);
router.post('/recipes', verifyToken, createRecipe);
router.put('/recipes/:id', verifyToken, updateRecipe);
router.delete('/recipes/:id', verifyToken, deleteRecipe);

export default router;
