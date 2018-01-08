import React, { Component } from "react";
import { ListGroup, ListGroupItem, Panel } from "react-bootstrap";

const ResultList = ({ results, handleSelect }) => {
  let items = results.map(r => {
    return (
      <ListGroupItem key={r.id} onClick={() => handleSelect(r)}>
        {r.name}
      </ListGroupItem>
    );
  });

  return (
    <Panel>
      <Panel.Heading>Results</Panel.Heading>
      <Panel.Body>
        <ListGroup>{items}</ListGroup>
      </Panel.Body>
    </Panel>
  );
};

export { ResultList };
