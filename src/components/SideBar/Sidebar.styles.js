import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.div`
  width: 80%;
  background-color: #283739;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  
 
`;

export const SidebarListItem = styled.li`
  margin-bottom: 20px;
  background-color: #283739;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  width: 93%;
  height: 100%;
 
  text-decoration: none;
  text-align: center;

  h1 {
    font-size: 15px;
    text-decoration: none;
    color: #ffffff;
    margin-top: 10px;
  }

  a {
    text-decoration: none; /* remove o sublinhado */
  }
`;

export const StyledNavLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${({ isActive }) => (isActive ? "#4a4a4a" : "transparent")};
  border-radius: 5px;
  padding: 5px;
`;
