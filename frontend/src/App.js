import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Switch } from "react-router-dom";
import { Navigation } from './components'
=======
import { Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import { Choices, Navigation } from './components'
>>>>>>> dev
=======
import { Navigation } from './components'
>>>>>>> dev
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";
import { Home, NewSpotForm, ManageSpots, UpdateSpot } from "./pages";
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
          <Route path='/spots/new' component={NewSpotForm} />
          <Route path='/spots/current' component={ManageSpots} />
          <Route path='/spots/:spotId/edit' component={UpdateSpot} />
          <Route path='/spots/:spotId' component={Spot} />
        </Switch>
      }
    </>
  );
}

export default App;
