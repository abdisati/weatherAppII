import { useState } from "react";
import { Weather } from "./utility/weather";


const weath=new Weather(); //initialize weather class



export default function App(){
const [city,setCity]=useState('');
const [isLoading,setLoading]=useState(false);
const [result,setResult]=useState([]);
const [error,setError]=useState();

async function fetchWeather(){
  try{
    setLoading(true);
    const data=await weath.getWeather(city);
    setResult(data);
    setError(null);
  }
  catch(error){
    console.log(error.message);
    setError(error.message);
  }
  finally{
    setLoading(false);
  }
}



function handleInput(e){
 const text=e.target.value;
setCity(text);


}
  return <div className="w-80 h-32 items-center mx-auto mt-4">
  <SearchBar city={city}  handleInput={handleInput} fetchWeather={fetchWeather}/>
  <div className="mt-2 border-2 text-center">
    <WeatherCard result={result} isLoading={isLoading} error={error}/>
  </div>
    

  </div>;
  



}


function SearchBar({city,handleInput,fetchWeather}){
  return <div className="flex justify-between gap-1.5">
    <input  value={city} type='text' placeholder="Type the city to search" className="border-2 flex-1" onChange={(e)=>{handleInput(e)}}/> <button className="border-2" onClick={fetchWeather}>Search</button>
  </div>;
}

function WeatherCard({result,isLoading,error}){
  if(result.length===0) console.log('result is 0');
 const list=result.map((val,index)=>{
  const {city,temperature,wind,rain}=val;

  return <WeatherRow city={city} temperature={temperature} wind={wind} rain={rain} key={index}/>
 });
  return <div>
   {isLoading&&<p>Loading..</p>}
   {error&&<p>{error}</p>}
{list}
  </div>;
}

function WeatherRow(props){
  const {city,temperature,wind,rain}=props;
  return <ol>
    <li>City: {city}</li>
    <li>Temperature: {temperature}</li>
    <li>Wind: {wind}</li>
    <li>Rain: {rain}</li>
  </ol>
}