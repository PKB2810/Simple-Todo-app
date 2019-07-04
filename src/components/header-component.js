import React from "react";
import TextComponent from './text-component';
import { expression } from "@babel/template";

class HeaderComponent extends React.Component{

constructor(props){
    super(props);
}

render(){
return(
    <>
        <TextComponent textSize="lg">
                {this.props.children}
        </TextComponent>

    </>

)


}

}
export default HeaderComponent; 
