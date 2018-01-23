import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Map } from "immutable";
import { removeSpecialChars } from "../utils/string.js";
import { Segment, Label, List } from "semantic-ui-react";

const Item = ({ active, feat, history, handleClick }) => {
  let benefitSnippet = feat.benefit.split(".")[0];
  let labelColor = "";
  switch (feat.type) {
    case "Combat":
      labelColor = "red";
      break;
    case "General":
      labelColor = "teal";
      break;
    default:
      labelColor = "blue";
      break;
  }

  return (
    <List.Item
      key={feat.id}
      onClick={() => {
        handleClick({ key: feat.key, id: feat.id });
      }}
      active={active}
    >
      <List.Header>
        {feat.name + " "}
        <Label color={labelColor} style={{ marginLeft: "1ex" }}>
          {feat.type}
        </Label>
      </List.Header>
      <List.Description>
        <em>{benefitSnippet}</em>
      </List.Description>
    </List.Item>
  );
};

const ResultList = ({ results, selected, input, handleClick }) => {
  const re = new RegExp(input, "i");
  const items = results
    .valueSeq()
    .filter(f => f.name.match(re))
    .toArray()
    .slice(0, 101)
    .map(r => (
      <Item
        active={selected && selected === r.key}
        key={r.id}
        feat={r}
        handleClick={handleClick}
      />
    ));

  return (
    <List divided selection>
      {items}
    </List>
  );
};

export { ResultList };
