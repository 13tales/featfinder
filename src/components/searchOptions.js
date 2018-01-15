import React, { Component } from "react";
import { Panel } from "react-bootstrap";

export const SearchOptions = ({ show }) => {
  return (
    <Panel expanded={show}>
      <Panel.Collapse>
        <Panel.Body>
          <p>Options will go here</p>
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  );
};
