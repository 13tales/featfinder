import React, { Component } from "react";
import { Route } from "react-router-dom";
import { getSuccessorFeats } from "../actions/actions.js";
import { connect } from "react-redux";

const Successors = ({ successors, getSuccessorFeats }) => {
  console.log(successors);
  return (
    <div>
      <h3>Required by</h3>
      <ul>{successors.map(s => <li key={s}>{s}</li>)}</ul>
    </div>
  );
};

class FeatDetail extends Component {
  componentDidMount() {
    console.log("Mounted.");
    this.props.getSuccessors(this.props.match.params.id);
  }

  render() {
    const feat = this.props.feats.get(this.props.match.params.id) || {
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
        <Successors
          successors={this.props.successors}
          getSuccessorFeats={this.props.getSuccessors}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feats: state.feats,
    successors: state.selected.successors
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
