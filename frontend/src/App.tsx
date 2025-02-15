
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import { ImageProvider } from './components/ImageContext';
import About from './components/about/About';
import Cities from './components/cities/Cities';
import Resources from './components/resources/Resources';
import Medicals from './components/medical/Medicals';
import Home from './components/home/HomePage';
import CityInstancePage from './components/cities/CityInstancePage';
import ResourceInstancePage from './components/resources/ResourceInstancePage';
import MedicalInstancePage from './components/medical/MedicalInstancePage';
import SearchPage from './components/search/SearchPage';
import VisualizationPage from './components/visualizations/VisualizationPage';
import ProviderVisualizationPage from './components/providerVisualizations/ProviderVisualizations';

function App() {
    return (
      <>
      <ImageProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/medical" element={<Medicals />} />
        <Route path='/cities/:cityName' element={<CityInstancePage/> } />
        <Route path='/resources/:resourceName' element={<ResourceInstancePage/> } />
        <Route path='/medical/:medicalName' element={<MedicalInstancePage/> } />
        <Route path="/visualizations" element={<VisualizationPage />} />
        <Route path="/providerVisualizations" element={<ProviderVisualizationPage />} />
        </Routes>
       </BrowserRouter>
       </ImageProvider>
       </>
    );
}

export default App;

