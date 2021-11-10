import React from 'react'
import { Navbar, Nav, Container, Row, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "./../../util/Modal/Form-modal"
import { createScrap, updateScrap, loadUser } from "./../../store/actions/basicFeature"
import { connect } from "react-redux";

const Header = (props) => {

    const {
      createScrap,
      loadUser
    } = props;

    const fetchModalChildData = (data) => {
      createScrap({...data, ...{status:'created'}})
    }

    return (
        <>
          <Navbar fixed="top" bg="light">
            <Container className="d-flex justify-content-start">
              <Navbar.Brand>
                <Link to="/">
                  <img
                  alt=""
                  src="https://cdn.logo.com/hotlink-ok/logo-social.png"
                  width="130"
                  height="50"
                  className="d-inline-block align-top"
                />
                </Link>
                {' '}
              </Navbar.Brand>
              <Nav>
                <Modal fetchModalToParentData={fetchModalChildData}/>
                <Button style={{marginLeft: '10px'}} onClick={() => loadUser()} variant="primary">Fetch Latest</Button>{' '}
              </Nav>
            </Container>
          </Navbar>
          </>
    )
}

export default withRouter(
  connect(null, {createScrap, updateScrap, loadUser})(Header)
);