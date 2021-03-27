import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Movie from "./SingleMovie";
import SearchAppBar from './NavBar'
import Footer from './Footer'

function App() {
  return (<>
<SearchAppBar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/movies/:id" children={<Movie/>}/>

      </Switch>
      <Footer/>
      </>
  );
}

export default App;
