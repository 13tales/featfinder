import React from "react";
import {
  Grid,
  Row,
  Col,
  FormControl,
  ControlLabel,
  Form,
  FormGroup,
  InputGroup,
  Glyphicon,
  Button
} from "react-bootstrap";

let SearchBox = ({ handleInput, input, toggleOptions }) => {
  return (
    <Form horizontal>
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>
            <Glyphicon glyph="search" />
          </InputGroup.Addon>
          <FormControl
            id="search"
            name="search"
            type="text"
            placeholder="Input goes here"
            value={input}
            onChange={e => {
              return handleInput(e.target.value);
            }}
          />
          <InputGroup.Button>
            <Button onClick={toggleOptions}>
              <Glyphicon glyph="option-horizontal" />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export { SearchBox };
