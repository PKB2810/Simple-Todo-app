import React from "react";
import TextComponent from "./text-component";

class HeaderComponent extends React.Component {
  render() {
    return (
      <header className="headerChild">
        <TextComponent textSize="lg">{this.props.children}</TextComponent>
      </header>
    );
  }
}
export default HeaderComponent; 
