import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Choices, Navigation } from './components'
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";
import { Reviews, Home } from "./pages";
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
      <Choices />
      {isLoaded &&
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/reviews' component={Reviews} />
          <Route path='/spot/:spotId' component={Spot} />
        </Switch>
      }
    </>
  );
}

export default App;
