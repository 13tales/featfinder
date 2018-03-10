import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Map } from "immutable";
import { removeSpecialChars } from "../utils/string.js";
import {
  Accordion,
  Message,
  Icon,
  Header,
  Segment,
  Label,
  List
} from "semantic-ui-react";
import { default as CategorySublist } from "./categorySubList.js";

export const Item = ({ active, feat, history, handleClick }) => {
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

const ResultList = ({ subset, selected, handleClick, cache, emptyMessage }) => {
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
          <CategorySublist featList={displayed} count={count} featType={t} />
        ]
      : list;
  }, []);

  return (
    <Accordion exclusive={false}>
      {subset.length > 0 ? (
        categoryList
      ) : (
        <Message content={<em>{emptyMessage}</em>} />
      )}
    </Accordion>
  );
};

export { ResultList };
