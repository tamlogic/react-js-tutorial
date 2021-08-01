import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SignIn } from '../../store/slices/auth';
import md5 from 'md5';

function Login(props) {
  let history = useHistory();
  const [error, setError] = useState(null);
 
  // handle button click of login form
  const handleLoginForm = (values) => {
    setError(null);
    let loginData = {
      admin_id: values.username,
      password_hash: md5(values.password)
    }
    let x = SignIn(loginData, history);
    console.log(x);
    setError(x);
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("validation.required"),
    password: Yup.string().required("validation.required"),
  });
 
  return (
    <Container>
      <Row>
        <Col sm="10" md={{ size: 4, offset: 4 }}>
          <section style={{ marginTop: 30 }}>
            <h1 style={{textAlign: 'center'}}>Login</h1><br />
            <div>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    handleLoginForm(values);
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="exampleUsername">Email</Label>
                      <Input type="email" name="username" id="exampleUsername" placeholder="with a placeholder"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}/>
                    </FormGroup>
                    <FormGroup style={{ marginTop: 15, marginBottom: 10 }}>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="password placeholder"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}/>
                    </FormGroup>
                    <div style={{marginBottom: 5 }}>
                      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                    </div>
                   
                    <Button type="submit" color="primary" disabled={isSubmitting}>
                      Submit
                    </Button>
                    {isSubmitting && <Spinner style={{ marginLeft: 8, width: '1.5rem', height: '1.5rem' }} 
                              color="primary" children=""/>}
                  </Form>
                )}
              </Formik>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
 
export default Login;