import axios from "axios";

// Function to call the backend and get a recipe
export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    
    try {
        // Make a POST request to your backend
        const response = await axios.post("http://localhost:5000/api/get-recipe", {
            ingredients: ingredientsArr,  
        });

        
        return response.data.content[0].text;  
    } catch (error) {
        console.error("Error getting recipe from backend:", error.message);
    }
}
