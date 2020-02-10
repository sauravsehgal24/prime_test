import React, {useState} from "react";
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";
import "./App.css";

function App() {

  const [inputState,setInputState] = useState();
  const [medians,setMedians] = useState([]);

  const bindInput = (e) =>{
    setInputState(e.target.value);
  }

  const getMedian = () =>{
    setMedians([])
    const payload = {
      upperLimit:inputState,
    }

    let config = {
      headers: {
        securetoken: process.env.REACT_APP_TOKEN,
      }
    }

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/prime_numbers`, payload, config)
    .then((res)=>{
      const medians = res.data.median;
      console.log(medians)
      setMedians(medians)
    })
    .catch((err)=>{
      console.log(err)
    })
  }



  return (
    <Container
      style={{ backgroundImage: "url(./assets/images/mathSigns.png)" }}
      fluid
    >
      <Row>
        <Col xl={7} lg={7} md={7} sm={12} xs={12} className="col1">
          <div className="intro">
            <h1 style={{ fontSize: "60px" }}>Prime Median</h1>
            <h4>Calculate median of set of prime numbers</h4>
          </div>
        </Col>

        <Col xl={5} lg={5} md={5} sm={12} xs={12} className="col2">
          <Card className="intro-card">
            <Card.Body>
              <Form.Group >
                <Form.Control className='form-input'  type="number" placeholder="Upper Limit (Numeric)" onChange={(e)=>{bindInput(e)}}/>
              </Form.Group>
              <Button className="submit" size="lg" onClick={()=>getMedian()}>
                Calculate Median
              </Button>
              <div className='result-div'>
                {medians.length == 0 ? '' : <h3>Median{medians.length == 1 ? ' is':'s are '}</h3>}
                {
                 medians.map((median)=>{
                    return (
                      <h3>{median}</h3>
                    )
                  }) 
                }
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
