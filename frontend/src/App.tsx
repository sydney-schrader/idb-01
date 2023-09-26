
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Button from './components/Nav/Button';
import Section from './components/Nav/Button';

import About from './components/about/About';
import Cities from './components/cities/Cities';
import Resources from './components/resources/Resources';
import Medical from './components/medical/Medical';
import Home from './components/home/HomePage';


function App() {
    return (
      <>
      <BrowserRouter>
        <Nav />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/medical" element={<Medical />} />
        </Routes>
       </BrowserRouter>
       </>
    );
}

export default App;

