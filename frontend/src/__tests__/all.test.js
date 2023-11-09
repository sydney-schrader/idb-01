import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import City from '../components/cities/City';
import Resource from '../components/resources/Resource';
import Medical from '../components/medical/Medical';
import HomePage from '../components/home/HomePage';
import About from '../components/about/About';
import Nav from '../components/Nav/Nav';
import App from  '../App'


it('Init City', () => {
    const city = {
      csa_label: 'City of Agoura Hills',
      imageUrl: 'https://www.google.com/imgres?imgurl=https://downtownarcadia.org/wp-content/uploads/2022/10/1st-street.jpg&tbnid=tNqiVh6y5iTvGM&vet=1&imgrefurl=https://downtownarcadia.org/about-downtown-arcadia/&docid=-wjEDJJV1U95HM&w=778&h=442&source=sh/x/im/m1/1&shem=uvafe2',
      total_unsheltered_pop: 2,
      total_sheltered_pop: 0, 
      total_pop: 2,
      square_miles: 5.42772,
      density_unsheltered: 0.368479,
      density_sheltered: null, 
      density_total: 0.368479,
    };
    const component = renderer.create(
        <BrowserRouter>
          <City card={city} />
        </BrowserRouter>,
      );
    
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
});

it('Init Resource', () => {
    const shelter = {
      name: '1736 Family Crisis Center',
      imageUrl: 'https://www.1736fcc.org/sites/default/files/styles/hero_icon/public/2021-06/1736%20FCC%20Logo.png?itok=gEHxVKS4',
      addrln1: '2116 Arlington Ave',
      zip: 90018, 
      hours: "Monday through Friday, 8:30am to 5:30pm. Evenings and Saturdays by appointment.",
      phones: null,
      url:"www.1736fcc.org",
      description: "The agency provides case management, counseling services, domestic violence services, family support services for low income families, runaway services, emergency and transitional shelter for battered women and their children, shelter for runaway/homeless youth, and welfare-to-work support services.  Services are provided at two community service center locations in South Los Angeles and Torrance, an emergency youth shelter in Hermosa Beach, and four confidentially located domestic violence shelters.",
    };
    const component = renderer.create(
        <BrowserRouter>
          <Resource card={shelter} />
        </BrowserRouter>,
      );
    
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
});

it('Init Medicare', () => {
    const medical = {
      name: 'Alafia Mental Health Center',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw4YFd12QcC7CwYI4hA8W7iuNWvEK47ZjU1qE9S4HKaWDdLflLgLgiz9tHq-r_UN8FzPc&usqp=CAU',
      addrln1: '11410 Avalon Blvd., ',
      zip: 90061, 
      hours: null,
      City: "City of Avalon",
      phones: '(323) 352 -6422',
      url:"www.1736fcc.org",
      description: "The agency provides case management, counseling services, domestic violence services, family support services for low income families, runaway services, emergency and transitional shelter for battered women and their children, shelter for runaway/homeless youth, and welfare-to-work support services.  Services are provided at two community service center locations in South Los Angeles and Torrance, an emergency youth shelter in Hermosa Beach, and four confidentially located domestic violence shelters.",
    };
    const component = renderer.create(
        <BrowserRouter>
          <Medical card={medical} />
        </BrowserRouter>,
      );
    
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
});

it('renders Los Angeles Homeless Helper Home page', () => {
    render(<HomePage />);
    expect(screen.getByText('Los Angeles Homeless Helper')).toBeInTheDocument();
});

it('renders Instances on the Home page', () => {
    render(<HomePage />);
    expect(screen.getByText('Cities')).toBeInTheDocument();
});

it('renders about page', () => {
    render(<About />);
    expect(screen.getByText('About LA Homeless Helper')).toBeInTheDocument();
});

it('renders about page tools', () => {
    render(<About />);
    expect(screen.getByText("Tools")).toBeInTheDocument();
});

it('Init About', () => {
    const component = renderer.create(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

  

it('Init NavBar', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


  
it('Init App', () => {
    const component = renderer.create(<App />);
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
  
  
  