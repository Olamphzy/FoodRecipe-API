import React, {useEffect, useState} from "react";
import "../App.css";
import Recipe from "./Recipe";
import Header from "./Header"

const App = () => {

  const APP_ID = '57931e6b';
  const APP_KEY = 'ca2802ac5bbb85d88c498f647b3c1400';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')


useEffect(() => {
 getRecipes();
}, [query])

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
const data = await response.json();
setRecipes(data.hits);
console.log(data.hits);


//To fetch an api can also be written as this below
// fetch(`https://api.edaman.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;)
// .then(response => {
//   response.json()
// })
}

const updateSearch = (e) => {
  setSearch(e.target.value)
  console.log(search)
}

const getSearch = (e) => {
  e.preventDefault();
  setQuery(search)
  setSearch('')
}
  return(
    <div className="App">
    <Header text="FOOD RECIPES APP" />
    <form onSubmit={getSearch} className="search-form">
      <input 
      type="text"
      placeholder="Search For Food Recipe" 
      className="search-bar" 
      value={search} 
      onChange={updateSearch}
      />
      <button type="submit" className="button">
        Search
      </button>
    </form>
    <div className="recipes">
    {recipes.map(recipe =>(
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))}
    </div>
    </div>
  )
}

export default App;