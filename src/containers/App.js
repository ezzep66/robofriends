import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry"
import "./App.css";

//STATE
/*
The description of your app
an object which describes your application
state is able to change
props don't change >> props come from state

*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ""
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users}))    
    //everytime the state changes > UPDATING > render()
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })    
  }

  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return(
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
          
        </Scroll>
      </div>    
    )    
  }
}
export default App