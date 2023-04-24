import React, { useState } from "react";
import styled from "styled-components";

const StateSelect = ({ value, onChange }) => {
  const [showList, setShowList] = useState(false);

  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  const handleInputClick = () => {
    setShowList(!showList);
  };

  const handleItemClick = (state) => {
    onChange(state);
    setShowList(false);
  };

  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  return (
    <Wrapper>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
      {showList && (
        <List>
          {states.map((state) => (
            <ListItem key={state} onClick={() => handleItemClick(state)}>
              {state}
            </ListItem>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 0.5rem;
`;

const List = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid black;
  list-style: none;
  z-index: 1;
`;

const ListItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: gray;
    color: white;
  }
`;
