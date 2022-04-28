import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// page Components
import Create from "./pages/Create/Create";
import Home from "./pages/Home/Home";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
// styles
import './Styles/App.css'
//components
import NavBar from "./components/NavBar";
import Error from "./components/Error";
import ColorSelector from "./components/ColorSelector";

const App = () => {
    return (
        <div className="App"  >
            <BrowserRouter>
                <NavBar />
                <ColorSelector />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/recipe/:id' element={<Recipe />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div >
    );
}

export default App;