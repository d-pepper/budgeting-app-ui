import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      //result: {},
      income: [],
      outgoing: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8888")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            income: result.income,
            outgoing: result.outgoing
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {

    const { error, isLoaded, income, outgoing} = this.state;

    if(error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Budgeting App</h1>
        </header>
        <div className="left">
          <h3>Income</h3>
          {income.map(item => (
            <p>
              <span>{item.name}</span>
              <span>{item.amount}</span>
            </p>
          ))}
          <button>Add new item</button>
        </div>
        <div className="left">
          <h3>Outgoing</h3>
          {outgoing.map(item => (
            <p>
              <span>{item.name}</span>
              <span>{item.amount}</span>
            </p>
          ))}
          <button>Add new item</button>
        </div>
      </div>
    )};
  }
}

export default App;
