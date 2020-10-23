
import React,{ useEffect, useState } from "react";
import './App.css'
import Recipe from "./Recipe";

const App = ()=> {
  const APP_ID = '60f2d4ef';
  const APP_KEY = '3d340a5ce933a31281a2bece745b9889'
  const [recipes,setRecipes] = useState([])
  const [search,setSearch] = useState('')
  const [query,setQuery] = useState('chicken');

  useEffect(()=>{
    const getRecipes = async()=>{
      const reponse = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10&calories=591-722&health=alcohol-free`)
      const data= await reponse.json()
      console.log(data)
      setRecipes(data.hits)
    }
    getRecipes()
  },[query]);  //If this ([]) argument is added we it runs when page refreshes any additional arguments are added then at their changing the useEffect also runs

  
  const UpdateSearch = (e)=>{
    setSearch(e.target.value)
    console.log(search)
  }
  const getSearch = (e)=>{
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }
  return (
    <div className="App">
           <h1>Get Your favorite recipes here!</h1>
          <form onSubmit={getSearch} className="search-form">
               <input className= "search-bar" value={search} onChange={UpdateSearch} type="text"/>
              <button className="search-button" type="submit">
                Search
              </button>           
          </form>
          <div className="recipes">
            {recipes.map((recipe)=><Recipe key={recipe.recipe.label} title={recipe.recipe.label} image={recipe.recipe.image} calories={recipe.recipe.calories} ingredients={recipe.recipe.ingredients}/>)}
          </div>

          
    </div>
  )
};


export default App;
