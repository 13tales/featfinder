import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormControl,
  ControlLabel,
  Form,
  FormGroup,
  InputGroup,
  Glyphicon
} from "react-bootstrap";

let SearchBox = ({ handleInput, input }) => {
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
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export { SearchBox };
