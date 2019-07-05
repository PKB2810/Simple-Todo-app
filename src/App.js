import React ,{Suspense ,lazy}from "react";
import logo from "./logo.svg";
import "./App.css";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import registeredUsers from "./redux/registeredUsers";
import reducer from "./redux/redux-reducer";
import styled from "styled-components";
import { Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";
import regiteredUsersState from "./redux/registeredUsers";
import MyProvider from "./MyProvider";
import MyContext from "./MyContext";
import HeaderComponent from "./components/header-component";
import ErrorBoundary from "./components/error-boundary";
//import LoginComponent from "./components/login-component";
//import Main from "./components/Main";
const Main = React.lazy(() => import("./components/Main")); //lazy load components
const LoginComponent = React.lazy(() => import("./components/login-component"));//lazy load components


const rootReducer = combineReducers({ todoList: reducer });

const store = createStore(rootReducer, regiteredUsersState);

function App() {
  return (
    <MyProvider>
      <MyContext.Consumer>
        {context => (
          <div id="parent" style={{ backgroundColor: context.BGColor }}>
            <HeaderComponent>Todo App</HeaderComponent>
            <Provider store={store}>
              <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                  <Route path="/app" component={Main} />
                  <Route path="/login" render={() => <ErrorBoundary>
                            <LoginComponent/>
                          </ErrorBoundary> } />
                
                  <Redirect to="/login" />
                </Switch>
              </Suspense>
              </BrowserRouter>
            </Provider>
          </div>
        )}
      </MyContext.Consumer>
    </MyProvider>
  );
}

export default App;
