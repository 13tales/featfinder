import React, { Component } from "react";
import { ListGroup, ListGroupItem, Label } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Map } from "immutable";
import { removeSpecialChars } from "../utils/string.js";

const Item = ({ feat, history, handleClick }) => {
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
      key={feat.id}
      onClick={() => {
        handleClick({ key: feat.key, id: feat.id });
      }}
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

const ResultList = ({ results, input, handleClick }) => {
  const re = new RegExp(input, "i");
  const items = results
    .valueSeq()
    .filter(f => f.name.match(re))
    .toArray()
    .slice(0, 50)
    .map(r => <Item key={r.id} feat={r} handleClick={handleClick} />);

  return <ListGroup>{items}</ListGroup>;
};

export { ResultList };
