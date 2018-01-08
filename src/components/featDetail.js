import React, { Component } from "react";

const Successors = ({ successors }) => {
  return (
    <div>
      <h3>Required by</h3>
      <ul>{successors.map(s => <li key={s}>{s}</li>)}</ul>
    </div>
  );
};

const FeatDetail = props => {
  return (
    <div>
      <h2>{props.feat.name}</h2>
      <h3>Requires</h3>
      <p>{props.feat.prerequisites || "None"}</p>
      <h3>Description</h3>
      <p>{props.feat.description}</p>
      <h3>Benefit</h3>
      <p>{props.feat.benefit}</p>
      {props.feat.successors.length !== 0 && (
        <Successors successors={props.feat.successors} />
      )}
    </div>
  );
};

export { FeatDetail };
