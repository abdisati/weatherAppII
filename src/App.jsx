import { useState } from "react";



export default function App(){
const [city,setCity]=useState('');
const [isLoading,setLoading]=useState(true);
const [result,setResult]=useState([{city:'London',temperature:'20 Celcius', wind:'20 km/h', condition:'Good'}]);
const [error,setError]=useState();



function handleInput(e){
 const text=e.target.value.trim();
setCity(text);
console.log(city);

}
  return <div className="w-80 h-32 items-center mx-auto mt-4">
  <SearchBar city={city}  handleInput={handleInput}/>
  <div className="mt-2 border-2 text-center">
    <WeatherCard result={result}/>
  </div>
    

  </div>;
  



}


function SearchBar({city,handleInput}){
  return <div className="flex justify-between gap-1.5">
    <input  value={city} type='text' placeholder="Type the city to search" className="border-2 flex-1" onChange={(e)=>{handleInput(e)}}/> <button className="border-2" >Search</button>
  </div>;
}

function WeatherCard({result}){
 const list=result.map((val,index)=>{
  const {city,temperature,wind,condition}=val;

  return <WeatherRow city={city} temperature={temperature} wind={wind} condition={condition} key={index}/>
 });
  return <div>
{list}
  </div>;
}

function WeatherRow(props){
  const {city,temperature,wind,condition}=props;
  return <ol>
    <li>City: {city}</li>
    <li>Temperature: {temperature}</li>
    <li>Wind: {wind}</li>
    <li>Condition: {condition}</li>
  </ol>
}