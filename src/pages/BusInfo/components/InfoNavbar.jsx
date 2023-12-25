import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import MyNavbar from "../../../components/MyNavbar";

const InfoNavbar = ({ setDirection, direction, selectedBus }) => {
  return (
    <>
      <Container>
        <MyNavbar />
        <Row className="justify-content-center">
          <Col sm={6}>
            <Nav
              justify
              variant="underline"
              defaultActiveKey={direction ? "back" : "forth"}
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="forth"
                  onClick={() => {
                    setDirection(0);
                  }}
                >
                  <span className="text-primary">往 </span>
                  {selectedBus.forth}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="back"
                  onClick={() => {
                    setDirection(1);
                  }}
                >
                  <span className="text-primary">往 </span>
                  {selectedBus.back}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InfoNavbar;
