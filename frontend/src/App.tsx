
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';

import About from './components/about/About';
import Cities from './components/cities/Cities';
import City1 from './components/cities/city1/City1';
import City2 from './components/cities/city2/City2';
import City3 from './components/cities/city3/City3';
import Resources from './components/resources/Resources';
import Shelter1 from './components/resources/shelter1/Shelter1';
import Shelter2 from './components/resources/shelter2/Shelter2';
import Shelter3 from './components/resources/shelter3/Shelter3';
import Medical from './components/medical/Medical';
import Office1 from './components/medical/office1/Office1';
import Office2 from './components/medical/office2/Office2';
import Office3 from './components/medical/office3/Office3';
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
        <Route path="/cities/city1" element={<City1 />} />
        <Route path="/cities/city2" element={<City2 />} />
        <Route path="/cities/city3" element={<City3 />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/shelter1" element={<Shelter1 />} />
        <Route path="/resources/shelter2" element={<Shelter2 />} />
        <Route path="/resources/shelter3" element={<Shelter3 />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/medical/office1" element={<Office1 />} />
        <Route path="/medical/office2" element={<Office2 />} />
        <Route path="/medical/office3" element={<Office3 />} />
        </Routes>
       </BrowserRouter>
       </>
    );
}

export default App;

