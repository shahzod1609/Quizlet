import React, { useCallback, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate
} from 'react-router-dom';
import LogIn from './user/pages/LogIn';
import SignUp from './user/pages/SignUp';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import Main from './main/pages/Main';
import MainListApp from './main/mainList/MainListApp';
import PapkaIn from './papka-in/PapkaIn';
import ModuleInApp from './after-module/ModuleInApp';
import SearchListApp from './Search/SearchListApp';
import FolderListApp from './FoldersList/FolderListApp';
import Test from './quiz/Test';
import CardsIn from './CardsIn/CardsIn'
import TestingQuiz from './quiz/testing/Testing';
import Quiz from './test/Quiz'
import Profile from './user/profile/profile';

let logoutTimer

const App = () => {

  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [image,setImage] = useState('')
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [url, setUrl] = useState('localhost:8080')
  const login = useCallback((uid, token, expirationDate,image) => {
    setImage(image)
    setToken(token)
    setUserId(uid)
    console.log(uid , token , expirationDate , image,'------')
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
      localStorage.setItem(
      'userData',
      JSON.stringify({ id: uid, token: token,image:image, expiration: tokenExpirationDate.toISOString() })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setImage(null)
    setUserId(null)
    setTokenExpirationDate(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout,remainingTime)
    }else{
      clearTimeout(logoutTimer)
    }
  }, [token, logout , tokenExpirationDate])
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()) {
      login(storedData.id, storedData.token, new Date(storedData.expiration))
    }
  }, [login])
  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<MainListApp />} />
        <Route path="/learn/:moduleid" element={<Test />} />
        <Route path="/test/:moduleid" element={<Quiz />} />
        <Route path="/cards/:moduleid" element={<CardsIn />} />
        <Route path="/folder" element={<FolderListApp />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path="/search" element={<SearchListApp />} />
        <Route path="/papka-in" element={<PapkaIn />} />
        <Route path="/add-module" element={<Main />} />
        <Route path="/module-in/:moduleid" element={<ModuleInApp />} />
        <Route path="/logout" />
        <Route path="/login" element={<Navigate to="/" replace />} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }
  return (

    <BrowserRouter>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          url: url,
          image:image,
          login: login,
          logout: logout
        }}>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </AuthContext.Provider>
    </BrowserRouter>

  );
};

export default App;
