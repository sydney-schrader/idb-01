
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Button from './components/Nav/Button';
import Section from './components/Nav/Button';

import About from './components/about/About';
import Cities from './components/cities/Cities';
import Resources from './components/resources/Resources';
import Medical from './components/medical/Medical';


function App() {
    return (
      <BrowserRouter>
        <Nav />
        <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/medical" element={<Medical />} />
        </Routes>
        <div className="background">
          <h1 className="title">
            Los Angeles <br/> Homeless Helper
            </h1>
        </div>
        <div>
          <h1 className='lower-title'>
            three main pages here
          </h1>
        </div>
        <Section title={"Cities"}/> <Section title={"Resources"}/> <Section title={"Medical"}/>
       </BrowserRouter>
    );
}

export default App;

