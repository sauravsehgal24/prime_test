import React, {useState} from "react";
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner
} from "react-bootstrap";
import "./App.css";

function App(props) {
  const [inputState,setInputState] = useState('');
  const [inputStateValidationMessage,setInputStateValidationMessage] = useState('');
  const [loadingState,setLoadingState] = useState(false);
  const [medians,setMedians] = useState([]);

  // Input binding
  const bindInput = (e) =>{
    setInputState(e.target.value);
  }

  // Helper method to check input validation
  const inputValidationMessage = (message,e) =>{
    e.target.value <=2 || e.target.value > 10000000 ? setInputStateValidationMessage(message) : setInputStateValidationMessage('');
  }

  // Makes API POST call to server and get the result
  const getMedian = () =>{

    // Check all the validations
    if(inputStateValidationMessage != '' || inputState.trim() == ''){
      alert('Please fix the issues');
      return;
    }

    setLoadingState(true)
    setMedians([])
    const payload = {
      upperLimit:inputState,
    }

    // Add token in headers
    const config = {
      headers: {
        securetoken: process.env.REACT_APP_TOKEN,
      }
    }

    // Make POST Request
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/prime_numbers`, payload, config)
    .then((res)=>{
      const medians = res.data.median;
      setLoadingState(false);
      setMedians(medians);
    })
    .catch(()=>{
      alert('Server Error')
      setLoadingState(false);
    })
  }
  return (
    <Container
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
                <Form.Control className='form-input'  type="number" placeholder="Upper Limit (Numeric and Exclusive)" onChange={(e)=>{bindInput(e); inputValidationMessage('Upper Limit should be between 3 and 10000000',e); }}/>
              </Form.Group>
              <span style={{color:'red'}}>{inputStateValidationMessage}</span>
              <Button className="submit" size="lg" onClick={()=>getMedian()} disabled={loadingState} data-testid='button-calculate'>
                {!loadingState ? 'Calculate Median' : 
                  <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                />
                }
              </Button>
              <div className='result-div' data-testid='success-getting-data'>
                {medians.length == 0 ? '' : <h3>Median{medians.length == 1 ? ' is':'s are '}</h3>}
                {
                  medians.map((median)=>{
                    return (
                      <h3 >{median}</h3>
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
