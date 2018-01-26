import React, { PureComponent as Component } from "react";
import {
  List,
  Dimmer,
  Loader,
  Rail,
  Sticky,
  Button,
  Container,
  Segment
} from "semantic-ui-react";
import { Route, Link, withRouter } from "react-router-dom";
import { SIDEBAR, getSuccessorFeats } from "../actions/actions.js";
import { connect } from "react-redux";
import { removeSpecialChars } from "../utils/string.js";
import { push } from "react-router-redux";
import { PageSpinner } from "../components/spinner.js";

const Successors = ({ pending, successors }) => {
  const empty = successors.length > 0;
  return (
    <div>
      <h3>Required by</h3>
      <List bulleted={empty}>
        <Loader active={pending} />
        {empty ? (
          successors.map(s => (
            <List.Item>
              <Link to={`/feat/${removeSpecialChars(s)}`}>{s}</Link>
            </List.Item>
          ))
        ) : (
          <List.Item content={<em>None</em>} />
        )}
      </List>
    </div>
  );
};

class FeatDetail extends Component {
  state = {};
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name)
      return this.props.getSuccessors(
        this.props.feats.get(nextProps.match.params.name).id
      );
  }

  componentDidMount() {
    return (
      this.props.match.params.name &&
      this.props.getSuccessors(
        this.props.feats.get(this.props.match.params.name).id
      )
    );
  }

  handleContextRef = stickyContext => this.setState({ stickyContext });

  render() {
    const feat = this.props.feats.get(this.props.match.params.name) || {
      name: "",
      prerequisites: "",
      description: "",
      benefit: "",
      successors: []
    };

    const contextRef = this.state.stickyContext;

    return (
      <Container text>
        <div ref={this.handleContextRef}>
          <Rail internal position="left">
            <Sticky context={contextRef} offset={10}>
              <Button
                icon="search"
                size="large"
                circular
                positive
                basic
                onClick={this.props.toggleSidebar}
              />
            </Sticky>
          </Rail>
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
      </Container>
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
    getSuccessors: id => dispatch(getSuccessorFeats(id)),
    toggleSidebar: () => dispatch({ type: SIDEBAR })
  };
};

const ConnectedFeatDetail = connect(mapStateToProps, mapDispatchToProps)(
  FeatDetail
);

export default ConnectedFeatDetail;
