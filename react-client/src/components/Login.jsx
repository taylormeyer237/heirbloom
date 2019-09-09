import React from 'react';
import axios from 'axios';
import '../App.css';
import { 
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col
} from 'reactstrap';
import { baseUrl } from '../constants';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCredentials: {
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
  }

  handleChange(event) {
    // take the name ('email' and 'password') and input value for each from the form
    const { value, name } = event.target;
    const userCredentials = this.state.userCredentials;
    // assign the email and password to their input value
    userCredentials[name] = value;
    // set the state to those input values
    this.setState({userCredentials});
  }
    
  handleSubmit(event) {
    event.preventDefault();
    // extract the input email and password from this.state
    const { email, password } = this.state.userCredentials;
    // if either email or password fields are blank, alert the user
    if(!email || !password) {
      return alert('Email and Password are required!')
    }
    // else, send a post request to the server with the input credentials to handle authentication
    axios.post(`${baseUrl}/api/login`, this.state.userCredentials)
      .then((response) => {
        // console.log('LOGIN RESPONSE', response);
        // on successful login, response is an object with data property containing the user's token
        // save the token in the browser's sessionStorage
        sessionStorage.setItem('token', response.data.token);
        // if user successfully logs in, redirect them to the landing page 
        // (NOTE: Might not need isLoggedIn argument for other pages (except for recipes and profile?)
        this.props.history.push('/landing', {isLoggedIn: true});
      })
      .catch((err) => {
        console.log(err);
        alert('Problem logging in, check your credentials and try again!');
      })
  }

  handleSignupClick() {
    // redirect to signup component when signup button is clicked
    this.props.history.push('/signup');
  }

  render() {
    return (
      <div className="bg pt-5">
        <Row className="mt-5">
          <Col
            xl={{ size: 4, offset: 7 }}
            md={{ size: 5, offset: 6 }}
            xs={{ size: 10, offset: 1 }}
            className="mt-5"
          >
            <div className="login-head">
              <h3 className="ml-3">LOGIN</h3>
            </div>
            <div className="login-body pt-3">
              <div className="login-form">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Input onChange={this.handleChange} type="email" name="email" id="exampleEmail" placeholder="email" className="ml-3 col-11" />
                  </FormGroup>
                  <FormGroup>
                    <Input onChange={this.handleChange} type="password" name="password" id="examplePassword" placeholder="password" className="ml-3 col-11" />
                  </FormGroup>
                  <Row>
                    <Col className="col-12">
                      {/* GOTTA MAKE SIGN-UP BUTTON PRETTY!!! */}
                      First-time visitor? Please Sign-Up: 
                      <Button type="button" onClick={this.handleSignupClick} id="login-button" className="float-right mr-4 mb-1">
                        SIGN-UP
                      </Button>
                      <Button type="submit" id="login-button" className="float-right mr-4 mb-3">
                        LOGIN
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;