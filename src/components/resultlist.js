import React, { Component } from "react";
import { ListGroup, ListGroupItem, Panel, Label } from "react-bootstrap";

const Item = ({ feat, handleSelect, selected }) => {
  let benefitSnippet = feat.benefit.split(".")[0];
  let labelColor = "";
  switch (feat.type) {
    case "Combat":
      labelColor = "danger";
      break;
    case "General":
      labelColor = "primary";
      break;
    default:
      labelColor = "info";
      break;
  }

  return (
    <ListGroupItem
      active={selected.id === feat.id}
      key={feat.id}
      onClick={() => handleSelect(feat)}
    >
      <h4>
        {feat.name + " "}
        <Label bsStyle={labelColor} style={{ marginLeft: "1ex" }}>
          {feat.type}
        </Label>
      </h4>
      <p>
        <em>{benefitSnippet}</em>
      </p>
    </ListGroupItem>
  );
};

const ResultList = ({ results, handleSelect, selected }) => {
  let items = results.map(r => {
    return <Item feat={r} handleSelect={handleSelect} selected={selected} />;
  });

  return (
    <Panel style={{ height: "100%" }}>
      <Panel.Heading>Results</Panel.Heading>
      <Panel.Body style={{ height: "100%", overflow: "scroll" }}>
        <ListGroup>{items}</ListGroup>
      </Panel.Body>
    </Panel>
  );
};

export { ResultList };
