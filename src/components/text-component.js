import React, { Component, useState } from "react";


class TextComponent extends React.Component{
    constructor(props){
            super(props);

    }

    render(){
        let text= '';
        if(this.props.textSize === 'lg'){
            text = <h1>{this.props.children}</h1>;
        }else{
            if(this.props.textSize === 'md'){
                text = <h3>{this.props.children}</h3>;
            }else{

                text = <h6>{this.props.children}</h6>;
            }

        }
        return (<> {text}  </>       
        )

    }

}
export default TextComponent;