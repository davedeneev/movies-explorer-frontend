import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from '../Header/Header'
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import { UserContext, currentUser } from '../../utils/CurrentUserContext';

function App() {
  return (
    <div className="site">
      <UserContext.Provider value={currentUser}>
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Navigate to="/page-not-found" replace/>} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
