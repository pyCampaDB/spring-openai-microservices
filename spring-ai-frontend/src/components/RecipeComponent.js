import React from "react";

const RecipeComponent = (
    {ingredients,setIngredients, cuisine, setCuisine, dietaryRestrictions, setDietaryRestrictions,
        recipeResponse, setRecipeResponse, resetRecipeState
    }) => {
    

    const createRecipe = async () => {
        try{
            const response = await fetch(`http://localhost:8080/recipe-service/generate-recipe?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`);
            const data = await response.text();
            setRecipeResponse(data);
        } catch(e) {
            console.error("Error generating recipe: ",e);
        }
    }
    return (    
        <div className="tab-content">
            <h2>Create a Recipe</h2>
            <input 
                type="text"
                placeholder="Enter ingredients (comma separated)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                />
            <input 
                type="text"
                placeholder="Enter cuisine type"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                />
            <input 
                type="text"
                placeholder="Enter dietary restrictions (comma separated)"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                />
            <button className="no-tab" onClick={createRecipe}>Create Recipe</button>
            &nbsp;&nbsp;
            <button className="no-tab" onClick={resetRecipeState}>Reset</button>
            <div className="output">
                <pre>{recipeResponse}</pre>
            </div>
        </div>
    
    )
}

export default RecipeComponent;