import React from "react"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'



function ClaudeRecipe(props) {

    return (
        <div>
            <section className="suggested-recipe-container" aria-live="polite">
                <h2> Chef Claude Recommends:</h2>
                <ReactMarkdown>
                    {props.aiRecipe}
                </ReactMarkdown>
            </section>
        </div>
    );
}

export default ClaudeRecipe

