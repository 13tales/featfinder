import React, { PureComponent as Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { getSuccessorFeats } from "../actions/actions.js";
import { connect } from "react-redux";
import { removeSpecialChars } from "../utils/string.js";
import { push } from "react-router-redux";
import { PageSpinner } from "../components/spinner.js";

const Successors = ({ pending, successors }) => {
  const content = pending ? (
    <PageSpinner size="lg" />
  ) : successors.length !== 0 ? (
    <ul>
      {successors.map(s => (
        <li key={s}>
          <Link to={`/feat/${removeSpecialChars(s)}`}>{s}</Link>
        </li>
      ))}
    </ul>
  ) : (
    <p>
      <em>None</em>
    </p>
  );
  return (
    <div>
      <h3>Required by</h3>
      {content}
    </div>
  );
};

class FeatDetail extends Component {
  componentWillReceiveProps(nextProps) {
    console.log("Feat detail got props");
    if (
      this.props.match.params.name !== nextProps.match.params.name &&
      this.props.successors.length === 0
    )
      return this.props.getSuccessors(
        this.props.feats.get(nextProps.match.params.name).id
      );
  }

  componentDidMount() {
    console.log("Feat detail mounted");
    return (
      this.props.match.params.name &&
      this.props.getSuccessors(
        this.props.feats.get(this.props.match.params.name).id
      )
    );
  }

  render() {
    const feat = this.props.feats.get(this.props.match.params.name) || {
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
          pending={this.props.successorsPending}
          successors={this.props.successors}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feats: state.feats,
    successorsPending: state.actionPending.featSuccessors,
    successors: state.successorFeats
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
