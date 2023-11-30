import './home.css'
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import medicarePic from '../../assets/medicare-image.jpg'
import citiesPic from '../../assets/cities-image.jpg'
import resourcesPic from '../../assets/resources-image.jpg'

function Home() {
  return (
    <div className='background'>
      <div className='title-container'>
        <h4 className='title'>
          Los Angeles <br /> Homeless Helper
        </h4>
        <p className='lower-title' style={{color: 'white', fontSize: '20px', backgroundColor: '#ffa07b', borderRadius: 10, padding: 10}}>
          Los Angeles Homeless Helper is a tool for both  people wanting to help homeless people around them and also a <br/>
          tool for homeless people to see what resources are available for them
        </p>
      </div>
      <Container className='card-container'>
        <Row>
          <Col>
            <Card style={{ alignItems: 'center', backgroundColor: "#ffb091", height: "27rem" }}>
              <Card.Title className='header-1' style={{ color: "white" }}>
                <b>Cities</b>
              </Card.Title>
              <img
                src={citiesPic}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                  height: '100%'
                }}
              ></img>
              <Card.Body>
                <Button name='homeCities' href='/cities' className='card-link'>
                  Explore Cities in LA
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card style={{ alignItems: 'center', backgroundColor: "#ffb091" , height: "27rem"}}>
              <Card.Title className='header-1' style={{ color: "white" }}>
                <b>Resources</b>
              </Card.Title>
              <img
                src={resourcesPic}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                  height : '100%'
                }}
              ></img>
              <Card.Body>
                <Button name='homeResources' href='/resources' className='card-link'>
                  Explore Resources
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card style={{ alignItems: 'center', backgroundColor: "#ffb091", height: "27rem"}}>
              <Card.Title className='header-1' style={{ color: "white" }}>
                <b>Medical</b>
              </Card.Title>
              <img
                src={medicarePic}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                  height: '100%'
                }}
              ></img>
              <Card.Body>
                <Button name='homeMedical' href='/medical' className='card-link'>
                  Explore Medical Options
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;