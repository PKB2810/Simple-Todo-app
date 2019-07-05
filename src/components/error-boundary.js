import React from "react";
import TextComponent from './text-component';
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <>
            <TextComponent textSize="lg">
            Something went wrong...
            </TextComponent>
            <br />
            <TextComponent textSize="md">
              {this.state.error.toString()}
          </TextComponent>
          </>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

  export default ErrorBoundary;