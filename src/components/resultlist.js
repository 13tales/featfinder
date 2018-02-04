import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Map } from "immutable";
import { removeSpecialChars } from "../utils/string.js";
import { Icon, Header, Segment, Label, List } from "semantic-ui-react";

const Item = ({ active, feat, history, handleClick }) => {
  let benefitSnippet = feat.benefit.split(".")[0];

  return (
    <List.Item
      key={feat.id}
      onClick={() => {
        handleClick({ key: feat.key, id: feat.id });
      }}
      active={active}
    >
      <List.Content>
        <List.Header as={Header} sub>
          {feat.name + " "}
        </List.Header>
        <List.Description>
          <em>{benefitSnippet}</em>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

const ResultList = ({ subset, selected, handleClick, cache }) => {
  const ftypes = [
    "General",
    "Combat",
    "Item Creation",
    "Metamagic",
    "Monster",
    "Monster, Combat",
    "Grit",
    "Achievement",
    "Story",
    "Mythic",
    "Familiar",
    "Item Mastery",
    "Combat, Monster",
    "Combat, Meditation",
    "Meditation",
    "Combat Feat",
    "Combat, style",
    "Combat, Teamwork"
  ];

  const newListEntry = (r, category) => (
    <Item
      active={selected && selected === r.key}
      key={r.id + category}
      feat={r}
      handleClick={handleClick}
    />
  );

  const categoryList = ftypes.reduce((list, t) => {
    const sublist = subset.filter(i => i.type == t);

    const displayed = sublist.slice(0, 100).map(i => newListEntry(i, t));

    const count = sublist.length;

    return count > 0
      ? [
          ...list,
          <List.Header as={Header} icon="book">
            {t}
            <Label circular content={count > 100 ? "100+" : count} />
          </List.Header>,
          ...displayed
        ]
      : list;
  }, []);

  return (
    <List divided relaxed selection>
      {subset.length > 0 ? (
        categoryList
      ) : (
        <List.Item
          content={<em>Start typing a feat name to see results.</em>}
        />
      )}
    </List>
  );
};

export { ResultList };
