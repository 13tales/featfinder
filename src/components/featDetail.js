import React, { Component } from "react";
import { Route } from "react-router-dom";
import { getSuccessorFeats } from "../actions/actions.js";
import { connect } from "react-redux";

const Successors = ({ successors }) => {
  return (
    <div>
      <h3>Required by</h3>
      <ul>{successors.map(s => <li key={s}>{s}</li>)}</ul>
    </div>
  );
};

const FeatDetail = ({ match, feats }) => {
  console.log(feats);
  const feat = feats.get(match.params.id) || {
    name: "",
    prerequisites: "",
    description: "",
    benefit: "",
    successors: []
  };
  return (
    <div>
      <h2>{feat.name}</h2>
      <h3>Requires</h3>
      <p>{feat.prerequisites || "None"}</p>
      <h3>Description</h3>
      <p>{feat.description}</p>
      <h3>Benefit</h3>
      <p>{feat.benefit}</p>
      {feat.successors !== undefined && (
        <Successors successors={feat.successors} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    feats: state.feats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSuccessors: id => dispatch(getSuccessorFeats(id))
  };
};

const ConnectedFeatDetail = connect(mapStateToProps, mapDispatchToProps)(
  FeatDetail
);

export default ConnectedFeatDetail;
