import React, { Component } from "react";
import { ListGroup, ListGroupItem, Label } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Map } from "immutable";

const Item = ({ feat, history, selected }) => {
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
      onClick={() => history.push("/feat/" + feat.id)}
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

const ResultList = withRouter(({ results, history, selected, input }) => {
  const re = new RegExp(input, "i");
  const items = results
    .valueSeq()
    .filter(f => f.name.match(re))
    .toArray()
    .slice(0, 101)
    .map(r => (
      <Item key={r.id} feat={r} history={history} selected={selected} />
    ));

  return <ListGroup>{items}</ListGroup>;
});

export { ResultList };
