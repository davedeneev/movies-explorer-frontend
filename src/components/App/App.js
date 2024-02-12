import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from '../Header/Header'
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from "../../utils/MainApi";
import { UserContext } from '../../utils/CurrentUserContext';
import {getSavedMovies} from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleTokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi.checkToken(token)
          .then((data) => {
            if (data) {
              setCurrentUser(data);
              setLoggedIn(true);
            }
          })
          .catch(console.error)
          .finally(() => {
            setIsLoading(false);
          });
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className="site">
      <UserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn}/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={loggedIn ? (<Navigate to="/" replace />) : (<Register setLoggedIn={setLoggedIn} />)} />
          <Route path="/signin" element={loggedIn ? (<Navigate to="/" replace />) : (<Login setLoggedIn={setLoggedIn} handleTokenCheck={handleTokenCheck} />)} />
          <Route path="/movies" element={<ProtectedRoute component={Movies} loggedIn={loggedIn} isLoading={isLoading} />} />
          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} isLoading={isLoading} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} isLoading={isLoading} />} />
          <Route path="*" element={<Navigate to="/page-not-found" replace/>} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
