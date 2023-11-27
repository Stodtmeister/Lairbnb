import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Navigation } from './components'
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";
import { Home, NewSpotForm, ManageSpots, UpdateSpot, ManageReviews } from "./pages";
import Spot from "./pages/Spot/Spot";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleRouteChange = () => {
    const root = document.getElementById('root');
    root.classList.remove('spots-page');

    const spotPageRegex = /^\/spots\/\d+$/; // Regular expression to match "/spots/" followed by one or more digits

    if (spotPageRegex.test(history.location.pathname)) {
      root.classList.add('spots-page');
    }
  };

  useEffect(() => {
    handleRouteChange();

    const unlisten = history.listen(() => {
      handleRouteChange();
    });

    return () => unlisten();
  });


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/spots/new' component={NewSpotForm} />
          <Route path='/spots/current' component={ManageSpots} />
          <Route path='/reviews/current' component={ManageReviews} />
          <Route path='/spots/:spotId/edit' component={UpdateSpot} />
          <Route path='/spots/:spotId' component={Spot} />
        </Switch>
      }
    </>
  );
}

export default App;
