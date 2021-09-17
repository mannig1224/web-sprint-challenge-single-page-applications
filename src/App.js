import React, {useState, useEffect} from "react"
import { Route, Switch} from 'react-router-dom'
import { useHistory } from "react-router"
import schema from './validation/formSchema'
import * as yup from 'yup'
import axios from 'axios'
import Form from './Form';

// Home Component//
////////////////////////////////////////////////////////////////////////
function Home() {
  const history = useHistory();

  const routeToForm = () => {
    history.push(`/pizza`);
  }

  return(
      <div>
          <button onClick={routeToForm}  id='order-pizza'>Order Now!</button>
      </div>
  )
  
}
//////////////////////////////////////////////////////////////

//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  name: '',
  special: '',
  ///// DROPDOWN /////
  size: '',
  ///// CheckBox /////
  ham: false,
  sausage: false,
  pepperoni: false,
  pineapple: false
}

const initialFormErrors = {
  name: '',
  size: ''
}

const initialDisabled = true;
const initialOrder = [];
/////////////////////////////////////////////////




const App = () => {

  ///// States /////
  const [order, setOrder] = useState(initialOrder)
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean


  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/orders', newOrder)
      .then(res => {
        setOrder([...order, res.data]);
        setFormValues(initialFormValues);
      })
      .catch(err => {
        
        console.log(err)
      })
  }
  const validate = (name, value ) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
  
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })
  }





  //////////////////// Event Handlers /////////////////////////

  const inputChange = (name, value) => {

    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      special: formValues.special.trim(),
      size: formValues.size,
      ham: formValues.ham,
      sausage: formValues.sausage,
      pepperoni: formValues.pepperoni,
      pineapple: formValues.pineapple
    }

    postNewOrder(newOrder);
    console.log(newOrder);
  }

  const history = useHistory();

  const routeToHome = () => {
    history.push(`/`);
  }

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])



  return (
    <>
    <div className='Header'>
      <h1>Lambda Eats</h1>
      <button onClick={routeToHome}>Home</button>
    </div>
      

      

      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/pizza'>
          <Form
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
      </Switch>
    </>
  );
};
export default App;
