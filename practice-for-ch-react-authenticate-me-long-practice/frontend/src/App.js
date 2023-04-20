import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import BenchIndexPage from "./components/BenchIndexPage";
import BenchShowPage from "./components/BenchShowPage";
import BenchFormPage from "./components/BenchFormPage";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/login" ><LoginFormPage /></Route>
          <Route path="/signup"> <SignupFormPage /></Route>
          <Route path="/benches/new"><BenchFormPage /></Route>
          <Route path="/benches/:benchId"><BenchShowPage /></Route>
          <Route exact path="/"><BenchIndexPage /></Route>
        </Switch>
    </>
  );
}

export default App;