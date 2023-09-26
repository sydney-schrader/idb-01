
import './App.css';
import Nav from './components/Nav/Nav';
import Button from './components/Nav/Button';
import Section from './components/Nav/Button';



function App() {
    return (
      <>
      <Nav />
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
      </>
    );
}

export default App;

