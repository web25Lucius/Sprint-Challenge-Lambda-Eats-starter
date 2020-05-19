import React , {useState , useEffect} from "react";
import {Route, Link} from "react-router-dom"
import HomePage from "./HomePage"
import axios from 'axios'
import '../App.css'
import * as yup from "yup";


const formSchema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least two characters long.").required("Name is a required field"),
  size: yup.string().required("size is required"),
  sauce: yup.string().required("sauce is required"),
  pepperoni: yup.boolean().oneOf([true], "add pepperoni"),
  mushroom: yup.boolean().oneOf([true], "add mushroom"),
  basil: yup.boolean().oneOf([true], "add basil"),
  feta: yup.boolean().oneOf([true], "add feta"),
  kalamata: yup.boolean().oneOf([true], "add kalamata"),
  anchovie: yup.boolean().oneOf([true], "anchovie"),
  special: yup.string()
});


export default function Pizza (props){
  const [order, setOrder] = useState({
    name: "",
    size: "",
    sauce: "",
    pepperoni:  false,
    mushroom:  false,
    basil:  false,
    feta:  false,
    kalamata: false,
    anchovie: false,
    special: ""

  });



useEffect (()=>{
  formSchema.isValid(order).then(valid => {
console.log(valid, "order is verified");
  });
},[order]);



  const [errorState, setErrorState] = useState({
    name: "",
    size: "",
    sauce: "",
    pepperoni:  "",
    mushroom:  "",
    basil:  "",
    feta:  "",
    kalamata: "",
    anchovie: "",
    special: ""
  });
  // const stopAd = (e)=>{
  //  e.preventDefault();

   



 const formSubmit = (event) =>{
   event.preventDefault();
   console.log("pizza is on the way, form submitted");
   axios
   .post("https://reqres.in/api/users", order)
   .then(res => {
     setOrder(res.data); 
     console.log(`Your order of: ...${order}  , is on it's way!`, res);
   })
   .catch(err => console.log(err.response));
};

const changeHandler = (el) =>{
  el.persist();
  

  let toppings = 
  el.target.type === "checkbox" ? el.target.checked: el.target.value; 
  yup
  .reach(formSchema, el.target.name)
  .validate(toppings)
  .then(valid => {
    setErrorState({
      ...errorState,
      [el.target.name]: ""
    });
  })
  .catch(err => {
    setErrorState({
      ...errorState,
      [el.target.name]: err.errors[0]
    });
  })

setOrder({
  ...order,
  [el.target.name]: el.target.value
});
  };
 

  return (
    <>
      <h1>Panucci's Online Ordering</h1>
      <form className="form" onSubmit={formSubmit}>

        <label htmlFor="name"> Name: 
          <input className="name" id="name" type="text" onChange={changeHandler} name="name" value={order.name}></input>
          {errorState.name.length < 2 ? (<p className="error"> {errorState.name} </p>) : null}
        </label>

        <label htmlFor="size"> Size:
          <select onChange={changeHandler} name="size" value={order.size}>
            <option value="smal">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </label>

        <label htmlFor="sauce" > Sauce:
          <select onChange={changeHandler} name="sauce" value={order.sauce}>
            <option value="light">light</option>
            <option value="regular">regular</option>
            <option value="xtra">xtra</option>
          </select>
        </label>

        <label htmlFor="pepperoni"> pepperoni
          <input className="pepperoni" id="pepperoni" type="checkbox" checked={order.pepperoni} onChange={changeHandler} name="pepperoni"></input>
        </label>

        <label htmlFor="mushroom"> mushroom
          <input className="mushroom" id="mushroom" type="checkbox" checked={order.mushroom} onChange={changeHandler} name="mushroom"></input>
        </label>

        <label htmlFor="basil"> basil
          <input id="basil" type="checkbox" checked={order.basil} onChange={changeHandler} name="basil"></input>
        </label>

        <label htmlFor="feta"> feta
          <input id="feta" type="checkbox" checked={order.feta} onChange={changeHandler} name="feta"></input>
        </label>

        <label htmlFor="kalamata"> kalamata
          <input id="kalamata" type="checkbox" checked={order.kalamata} onChange={changeHandler} name="kalamata"></input>
        </label>
        <label htmlFor="anchovie"> anchovie
          <input id="anchovie" type="checkbox" checked={order.anchovie} onChange={changeHandler} name="anchovie"></input>
        </label>

        <label htmlFor="special"> special instructions
          <input id="special" type="textarea" value={order.special} onChange={changeHandler} name="special" ></input>
        </label>

        <label htmlFor="submit"> 
          <input className="submit" id="submit" type="submit" onChange={changeHandler} name="submit" ></input>
        </label>
        
      </form>
      <div className="gif">
        <iframe  title="gif"src="https://giphy.com/embed/9fuvOqZ8tbZOU" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
      </div>
      <Route exact path="/" component={HomePage}/>
      <Link to="/">
        <h2>winner winner ordered dinner...</h2>
      </Link>
      {/* <p><a href="https://giphy.com/gifs/happiness-9fuvOqZ8tbZOU">Seymour says Hi, click on that pizza!</a></p> */}
    </>
  );
}