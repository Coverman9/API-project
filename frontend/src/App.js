import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots";
import SpotIndex from "./components/Spot";
import UserSpots from "./components/Userspots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={"/"}>
            <SpotsIndex />
          </Route>
          <Route exact path={"/spot/:spotId"}>
            <SpotIndex />
          </Route>
          <Route exact path={"/spots/current"}>
            <UserSpots />
          </Route>
          <Route>Page Not found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
