import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Navigation } from './components'
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";
import { Reviews, Spots } from "./pages";


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
          <Route exact path='/' component={Spots} />
          <Route path='/reviews' component={Reviews} />
        </Switch>
      }
    </>
  );
}

export default App;
