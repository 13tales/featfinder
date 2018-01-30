import React from "react";
import { Input, Menu } from "semantic-ui-react";

let SearchBox = ({ handleInput, input, toggleOptions }) => {
  return (
    <Input
      icon="search"
      placeholder="Search..."
      value={input}
      onChange={e => {
        return handleInput(e.target.value);
      }}
      fluid
    />
  );
};

export { SearchBox };
