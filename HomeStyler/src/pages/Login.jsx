import React, { useState } from 'react';
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../home-components/ui/CommonSection";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom'; // Corrected useNavigate
import '../styles/login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Corrected hook name

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      setLoading(false);
      toast.success('Successfully logged in');
      navigate('/shop');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg='12' className='text-center'>
                <h5 className='fw-bold'>Loading....</h5>
              </Col>
            ) : (
              <Col lg='6' className="m-auto text-center">
                <h3 className='fw-bold mb-4'>Login</h3>
                <Form className="auth__form" onSubmit={signIn}> {/* Corrected onSubmit */}
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder='Enter Your Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder='Enter Your Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <button type="submit" className='buy__btn'>Login</button> {/* Corrected type */}
                  <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
