import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import MyNavbar from "../../../components/MyNavbar";

const InfoNavbar = ({ setDirection, direction, selectedBus }) => {
  return (
    <div className="mb-37">
      <Container className="position-fixed top-0 start-0 end-0 w-100 bg-dark z-3">
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
              <Nav.Item
                className={
                  // 單向公車不顯示回去方向
                  selectedBus.forth === selectedBus.back ? "d-none" : ""
                }
              >
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
    </div>
  );
};

export default InfoNavbar;
