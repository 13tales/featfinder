import React from "react";
import { Input, Menu } from "semantic-ui-react";

let SearchBox = ({ handleInput, input, toggleOptions }) => {
  return (
    <Menu>
      <Menu.Item header>FeatFinder</Menu.Item>
      <Menu.Item>
        <Input
          icon="search"
          placeholder="Search..."
          value={input}
          onChange={e => {
            return handleInput(e.target.value);
          }}
        />
      </Menu.Item>
    </Menu>
  );
};

export { SearchBox };
