import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Map } from "immutable";
import { removeSpecialChars } from "../utils/string.js";
import { Header, Segment, Label, List } from "semantic-ui-react";

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

const ResultList = ({ results, selected, input, handleClick }) => {
  const re = new RegExp(input, "i");
  const items = results
    .valueSeq()
    .filter(f => f.name.match(re))
    .toArray();

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

  const newListEntry = r => (
    <Item
      active={selected && selected === r.key}
      key={r.id}
      feat={r}
      handleClick={handleClick}
    />
  );

  const categoryList = ftypes.reduce((list, t) => {
    const sublist = items
      .filter(i => i.type == t)
      .slice(0, 100)
      .map(i => newListEntry(i));

    return sublist.length > 0
      ? [
          ...list,
          <List.Item key={t} icon="book" header={t} as={Header} />,
          ...sublist
        ]
      : list;
  }, []);

  return (
    <List divided relaxed selection>
      {input ? (
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
