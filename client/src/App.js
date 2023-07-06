import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

// this is the whole purpose of the config file json
// this allows us to reference scences instead of doing relative imports like ./../
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';

function App() {
    return (
    <div className="app">

    <BrowserRouter>
        <Routes>
            // This is how we will access our pages 
            <Route path="/" element={<LoginPage />} /> 
            <Route path="/home" element={<HomePage />} /> 
            // if you go to profile/useId then you can use this route
            //                    this is a param we can set
            <Route path="/profile/:userId" element={<ProfilePage />} /> 
        </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
