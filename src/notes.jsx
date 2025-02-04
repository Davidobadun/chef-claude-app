
//<input> in html displays an imput box
import ReactDOM from 'react-dom/client';
/*
<h1>It is currently sbout {new Date().getHours()}</h1>
//.getHours() returns the hour in 24hr clock. since it is 7:45pm it will retrun 19
//{new Date().getHours()%12} will display hours in 12 hr clock so 7pm
*/
function App() {
const hours = new Date().getHours()

let timeOfDay

if (hours <12){
  timeOfDay = "morning"
}else if (hours >=12 && hours <17){
  timeOfDay = "afternoon"
}else if (hours < 21) {
  timeOfDay = "evening"
}else {
  timeOfDay = "night"
}
  
  return (
    <h1> Good {timeOfDay} </h1>

  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

///////////////////////////////////////////////////////////////////
/*
Props are immutable
Props are properties passed into a compoonent

State- Values managed by th ecomponnent itself
Any time you have changing values that should be saved/displayed you will use a state.



 {
                model: "claude-3-haiku-20240307",
                max_tokens: 1024,
                system: `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Ingredients: ${ingredientsString}`,

                
            },
*/