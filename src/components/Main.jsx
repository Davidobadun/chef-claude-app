import React from "react"
import { useState } from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromChefClaude } from "../../ai.js"


export default function Main() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [hoveredItem, setHoveredItem] = useState(null)

    const recipeSection = React.useRef(null) //Reference for recipe section
    const ingredientInputRef = React.useRef(null) // Reference for the input field

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" })
        }

    }, [recipe])

    function addIngredient(event) {
        event.preventDefault() // Prevent default form submission

        const newIngredient = ingredientInputRef.current.value.trim()
        if (newIngredient) {
            setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
            ingredientInputRef.current.value = "" // Clear input field after adding
        }


    }

    async function handleClickGetRecipe() {
        setIsLoading(true) // start loading

        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        // Make sure the response is a string before setting it
        if (typeof recipeMarkdown === 'string') {
            setRecipe(recipeMarkdown)
        }


        setIsLoading(false)  // Stop loading once done
    }

    // Handle clear ingredient button
    function handleClearForm(event) {
        event.preventDefault()
        setIngredients([])
        setRecipe("")
    }

    // Handle key press (Enter) to add ingredient
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addIngredient(event)
        }
    }

    // Handle delete item
    const handleDelete = (index) => {
        const newIngredients = [...ingredients]
        newIngredients.splice(index, 1)
        setIngredients(newIngredients)  
        if (newIngredients.length <=3){
            setRecipe("")
        }
    };

    // Handle edit item
    const handleEdit = (index) => {
        const newIngredient = prompt("Edit ingredient:", ingredients[index])
        if (newIngredient) {
            const newIngredients = [...ingredients]
            newIngredients[index] = newIngredient
            setIngredients(newIngredients)
        }
    }


    return (
        <>
            <main>
                <form className="add-ingredient-form" onSubmit={addIngredient}>
                    <input
                        ref={ingredientInputRef}
                        type="text"
                        placeholder="e.g. oregano"
                        aria-label="Add ingredient"
                        name="ingredient"
                        onKeyDown={handleKeyPress} // Detect Enter key press
                    />
                    <button className="add-ingredient-button"> Add Ingredient</button>
                    <button className="clear-ingredient-button" onClick={handleClearForm}> Clear Ingredient List </button>
                </form>

                {ingredients.length > 0 ?
                    <IngredientsList
                        ref={recipeSection}
                        ingredients={ingredients}
                        getRecipe={handleClickGetRecipe}
                        isLoading={isLoading}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        hoveredItem={hoveredItem}
                        setHoveredItem={setHoveredItem}
                    />
                    : null}
                {isLoading && (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                )}
                {recipe && <ClaudeRecipe aiRecipe={recipe} />

                }
            </main>

        </>
    )
}