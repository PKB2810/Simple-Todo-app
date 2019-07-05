import React from "react";
import TextComponent from './text-component';
import { expression } from "@babel/template";

class HeaderComponent extends React.Component{

constructor(props){
    super(props);
}

render(){
return(
    <header className="headerChild">
        <TextComponent textSize="lg">
                {this.props.children}
        </TextComponent>

    </header>

)


}

}
export default HeaderComponent; 
