import React from "react";
import {Redirect} from "react-router-dom";
import {Button} from "reactstrap";
import TextComponent from './text-component';
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null ,redirect:false};
    }
    
    componentDidCatch(error, errorInfo) {
     
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
     
    }

    setRedirectFlag =() =>{
          this.setState({redirect:true})
    }

    redirectToLogin =()=>{
        if(this.state.redirect === true){
              return (
              <Redirect
                to={{
                  pathname: "/login"
                }}
              />
            );
        }

    }
    
    render() {
      if (this.state.errorInfo) {
     
        return (
          <section className="sectionChild">
            <TextComponent textSize="lg">
            Something went wrong...
            </TextComponent>
            <br />
            <TextComponent textSize="md">
              {this.state.error.toString()}
              <br/>
              <details>
              {this.state.errorInfo.componentStack.toString()}
              </details>
              <Button color="primary" onClick={this.setRedirectFlag}> 
               
                    Go back to Login page
                
             </Button>
          </TextComponent>
          {this.redirectToLogin()}
          </section>
        );
      }
     
      return this.props.children;
    }  
  }

  export default ErrorBoundary;