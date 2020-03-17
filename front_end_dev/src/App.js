import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import NavMenu from "./menu";
import Board from "./board";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "Dashboard"
    };
  }

  render() {
    return (
      <div>
        <div className="sidebar-wrapper">
          <NavMenu onOptionChange={({newOption})=>{this.setState({option:newOption})}}></NavMenu>
        </div>
        <div className="app-wrapper">
          <Board onOptionChange={(newOption)=>{this.setState({option:newOption})}}option={this.state.option}></Board>
        </div>
      </div>
    );
  }
}
