import Recipe from '../models/recipe.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.find();
            if (recipes.length === 0) {
                return res.status(404).json({ message: 'No recipes found' });
            } else {
                res.status(200).json(recipes);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const recipe = await Recipe.findById({ _id: id });
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json(recipe);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createRecipe: async (req, res) => {
        const { title, ingredients, description, image } = req.body;
        try {
            if (title && ingredients && description && image) {
                const newRecipe = new Recipe({
                    title: title,
                    ingredients: ingredients,
                    description: description,
                    image: image
                });
                await newRecipe.save();
                res.status(201).json(newRecipe);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, ingredients, description, image } = req.body;
        try {
            const updatedRecipe = await Recipe.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        title: title,
                        ingredients: ingredients,
                        description: description,
                        image: image
                    }
                }
            );
            if (updatedRecipe.modifiedCount === 0) {
                res.status(400).json({ message: 'Recipe not updated' });
            } else {
                res.status(200).json({
                    message: 'Recipe updated'
                });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedRecipe = await Recipe.deleteOne({ _id: id });
            if (deletedRecipe.deletedCount === 0) {
                return res.status(400).json({ message: 'Recipe not deleted' });
            } else {
                res.status(200).json({
                    message: 'Recipe deleted successfully'
                });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default recipeControllers;
