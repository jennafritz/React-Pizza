import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  constructor() {
    super()
    this.state = {
      pizzas: [],
      currentPizza: {
        topping: '',
        size: '',
        vegetarian: '',
        index: ''
      }
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
      .then(res => res.json())
      .then(pizzasArray => this.setState({pizzas: pizzasArray}))
  }

  handleEditButton = (pizza) => {
    this.setState({
      currentPizza: {
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian,
        id: pizza.id
      }
    })
  }

  handleToppingChange = (event) => {
    event.persist()
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        topping: event.target.value
      }
    })
  }

  handleSizeChange = (event) => {
    event.persist()
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        size: event.target.value
      }
    })
  }

  handleVegetarianChange = (event) => {
    event.persist()
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        vegetarian: event.target.value === "Vegetarian" ? true : false
      }
    })
  }

  handleSubmit = (event) => {
    event.persist()
    let oldIndex = this.state.pizzas.findIndex(pizza => pizza.id === this.state.currentPizza.id)
    fetch(`http://localhost:3000/pizzas/${this.state.currentPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...this.state.currentPizza
      })
    })
      .then(res => res.json())
      .then(updatedPizza => {
        this.state.pizzas.splice(oldIndex, 1, updatedPizza)
        this.setState({
          pizzas: this.state.pizzas
        })
      })
  }
  
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleToppingChange={this.handleToppingChange} handleSizeChange={this.handleSizeChange} handleVegetarianChange={this.handleVegetarianChange} currentPizza={this.state.currentPizza} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} handleEditButton={this.handleEditButton}/>
      </Fragment>
    );
  }
}

export default App;
