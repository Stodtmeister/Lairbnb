import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Navigation } from './components'
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";
import { Reviews, Home, CreateNewSpot } from "./pages";
import Spot from "./pages/Spot/Spot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/reviews' component={Reviews} />
          <Route path='/spots/new' component={CreateNewSpot} />
          <Route path='/spots/:spotId' component={Spot} />
        </Switch>
      }
    </>
  );
}

export default App;
