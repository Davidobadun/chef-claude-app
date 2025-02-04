import React from "react"

const IngredientsList = React.forwardRef((props, ref) => {



    // add ingredients list
    const ingredientsListItems = props.ingredients
        .filter((item) => item.trim() !== "")
        .map((item, index) => (
            <li
                key={index}
                onMouseEnter={() => props.setHoveredItem(index)}
                onMouseLeave={() => props.setHoveredItem(null)}
              className="ingredient-item"
            >
                <span>{item}</span>
                {props.hoveredItem === index && ( // Show dropdown when hovered
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => props.handleEdit(index)}>
                            Edit
                        </div>
                        <div className="dropdown-item" onClick={() => props.handleDelete(index)}>
                            Delete
                        </div>
                    </div>
                )}
                     
            </li>
        ))

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>

            {props.ingredients.length > 3 &&
                <div className="get-recipe-container">
                    <div ref={ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button
                        onClick={props.getRecipe}
                        disabled={props.isLoading}
                    >
                        {props.isLoading ? "Loading...." : "Get a recipe"}
                    </button>
                </div>
            }
        </section>
    )

})

export default IngredientsList


