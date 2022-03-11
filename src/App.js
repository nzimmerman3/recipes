import './App.css';
import { useState, useEffect } from 'react';

import axios from "axios"
import Food from './components/Food'

const fetchRecipes = (searchFood, setFoods) => {
  let searchUrl = "https://nutritionix-api.p.rapidapi.com/v1_1/search/" + searchFood
  var options = {
    method: 'GET',
    url: searchUrl,
    params: { fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat' },
    headers: {
      'x-rapidapi-host': 'nutritionix-api.p.rapidapi.com',
      'x-rapidapi-key': '8c5ea2e881msh5adc46f47dbb2acp1c24e0jsn6a9427c7a103'
    }
  };

  axios.request(options).then(response => {
    // console.log(response["data"]["hits"]);
    setFoods(response["data"]["hits"])
    return response
  })
}

function App() {
  const [search, setSearch] = useState("")
  const [foods, setFoods] = useState([])

  // useEffect(() => {
  //   fetchRecipes(food)
  // }, [food])
  console.log(foods)
  return (
    <div className="App">
      <form>
        <label>
          Food:
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)}></input>
          <button type="button" onClick={() => fetchRecipes(search, setFoods)}>Search</button>
        </label>
      </form>
      {foods.map(food => {
        return (<Food disp={food} />)
      })}
    </div>
  );
}

export default App;
