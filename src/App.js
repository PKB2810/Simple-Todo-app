import React ,{Suspense }from "react";
import "./App.css";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import userOperationsReducer from "./redux/user-operations-reducer";
import currentUserReducer from "./redux/current-user-reducer";
import { Route,  BrowserRouter, Switch, Redirect } from "react-router-dom";
import initialState from "./redux/initial-state";
import MyProvider from "./MyProvider";
import MyContext from "./MyContext";
import HeaderComponent from "./components/header-component";
import ErrorBoundary from "./components/error-boundary";
//import LoginComponent from "./components/login-component";
//import Main from "./components/Main";
const MainComponent = React.lazy(() => import("./components/main-component")); //lazy load components
const LoginComponent = React.lazy(() => import("./components/login-component"));//lazy load components


const rootReducer = combineReducers({
  todoList: userOperationsReducer,
  currentUser: currentUserReducer
});

const store = createStore(
  rootReducer,
  initialState
  + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
                  <Route path="/app" component={MainComponent} />
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
