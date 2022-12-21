import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  // TODO:
  // Implement 'useContext' to utilize 'user' props that was handed down
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <>
      <Wrapper>
        <Logo>
          <h1>Party Planner</h1>
        </Logo>
        <Nav>
          <Button as={Link} to="/">
            About
          </Button> 
          <Button as={Link} to="/parties">
            Parties
          </Button>
          <Button as={Link} to="/items">
            Items
          </Button>
          <Button as={Link} to="/location">
            Location
          </Button>
          <Button as={Link} to="/summary">
            View All Parties
          </Button>
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 2rem;
  color: blue;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  left: 20px;
`;

export default NavBar;