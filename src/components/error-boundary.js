import React from "react";
import {Redirect,withRouter} from "react-router-dom";
import {Button} from "reactstrap";
import TextComponent from './text-component';
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null ,redirect:false};
    }
    
    componentDidMount(){
        this.props.history.listen((location,action) => {
          if (this.state.hasError) {
            this.setState({
              hasError: false,
              redirect:false
            });
          }
        });

    }

    componentDidCatch(error, errorInfo) {
     
      this.setState({
        hasError: true,
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
      if (this.state.hasError) {
     
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

  export default withRouter(ErrorBoundary);