import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Layouts() {
  const { user, removeAuthInfo } = useContext(AuthContext);
  return (
    <>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Miraz Vai
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="m-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              {user ? (
                <>
                  <NavDropdown title="Issue Tracker">
                    <NavDropdown.Item as={Link} to="/issues/create">
                      Add new Issue
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/issues">
                      Issues List
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <></>
              )}
            </Nav>
            {user ? (
              <>
                <Nav.Link onClick={removeAuthInfo}>Logout</Nav.Link>
                <Navbar.Text>
                  Signed in as:{" "}
                  <b style={{ cursor: "crosshair" }}>
                    {user.username.toUpperCase()}
                  </b>
                </Navbar.Text>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/register">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
