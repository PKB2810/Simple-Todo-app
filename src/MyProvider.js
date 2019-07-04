import React from "react";
import MyContext from "./MyContext";

class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BGColor: "yellow"
    };
  }

  handleBGChange = e => {
    console.log(e.target.innerHTML);
    this.setState({ BGColor: e.target.innerHTML });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          BGColor: this.state.BGColor,
          handleBGChange: this.handleBGChange
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
export default MyProvider;
