import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container, Button } from 'reactstrap';
import UserTable from 'views/Component/User/UserTable';
import { getUser, removeUserSession } from '../../utils/Common';
 
function Dashboard() {
  return (
    <Container>
      <Row>
        <Col xs={3}><LeftMenu/></Col>
        <Col xs={9}><Content/></Col>
        <Col xs={12}><Bottom/></Col>
      </Row>
      <Row><UserTable clientId={1} /></Row>
    </Container>
  );
}

const LeftMenu = () => {
  const history = useHistory();
  console.log('left menu history: ', history.length);
  const user = getUser();
  // handle click event of logout button
  const signOut = async () => {
      removeUserSession();
      history.push('/login');
  };
  return (
    <React.Fragment>
      Welcome {(user.name== null)? "null": user.name}<br /><br />
      <Button color="danger" onClick={() => signOut()}>Logout</Button>
    </React.Fragment>
  );
}

const Content = () => {
  return "Content menu";
}

const Bottom = () => {
  return "Bottom";
}
 
export default Dashboard;