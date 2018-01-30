import React, { PureComponent as Component } from "react";
import {
  Icon,
  Popup,
  Header,
  Breadcrumb,
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
import {
  historyBack,
  gotoConnectedFeat,
  SIDEBAR,
  getSuccessorFeats,
  selectFeat,
  addBookmark,
  removeBookmark
} from "../actions/actions.js";
import { connect } from "react-redux";
import { removeSpecialChars } from "../utils/string.js";
import { push } from "react-router-redux";
import { PageSpinner } from "../components/spinner.js";

const Successors = ({ pending, successors, currentFeatKey, handleClick }) => {
  const empty = successors.length > 0;
  return (
    <div>
      <h3>Required by</h3>
      <List bulleted={empty}>
        <Loader active={pending} />
        {empty ? (
          successors.map(s => (
            <List.Item key={s}>
              <a
                onClick={() =>
                  handleClick(currentFeatKey, removeSpecialChars(s))
                }
              >
                {s}
              </a>
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
      successors: [],
      key: ""
    };

    const contextRef = this.state.stickyContext;
    const featIsBookmarked = this.props.bookmarks.has(feat.key);
    const addBookmarkIcon = (
      <Icon.Group>
        <Icon name="remove bookmark" />
        <Icon corner name="add" />
      </Icon.Group>
    );

    return (
      <Container text>
        <div ref={this.handleContextRef}>
          <Rail internal position="left">
            <Sticky context={contextRef} offset={10}>
              <Button
                icon="bars"
                size="large"
                circular
                positive
                basic
                onClick={this.props.toggleSidebar}
              />
            </Sticky>
          </Rail>
          <h2>
            {feat.name}
            <Popup
              trigger={
                <Button
                  style={{ marginLeft: "2em" }}
                  basic
                  circular
                  icon={featIsBookmarked ? "bookmark" : addBookmarkIcon}
                  active={featIsBookmarked}
                  size="large"
                  onClick={() => {
                    (featIsBookmarked && this.props.removeBookmark(feat.key)) ||
                      this.props.addBookmark(feat.key);
                  }}
                />
              }
              content={
                featIsBookmarked
                  ? "Remove from bookmarks"
                  : "Bookmark this feat"
              }
            />
          </h2>
          {this.props.history.length > 1 && (
            <Breadcrumb>
              {this.props.history
                .slice(0, -1)
                .reduce((collection, current, currentIndex) => {
                  const feat = this.props.feats.get(current);
                  return [
                    ...collection,
                    <Breadcrumb.Section
                      key={feat.id}
                      onClick={() =>
                        this.props.goBackInHistory(currentIndex, current)
                      }
                      content={feat.name}
                    />,
                    <Breadcrumb.Divider
                      key={feat.id + "divider"}
                      icon="arrow right"
                    />
                  ];
                }, [])}
              <Breadcrumb.Section content={feat.name} active />
            </Breadcrumb>
          )}
          <h3>Requires</h3>
          <p>{feat.prerequisites || "None"}</p>
          <h3>Description</h3>
          <p>{feat.description}</p>
          <h3>Benefit</h3>
          <p>{feat.benefit}</p>
          <Successors
            pending={this.props.successorsPending}
            successors={this.props.successors}
            currentFeatKey={feat.key}
            handleClick={this.props.gotoConnectedFeat}
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
    successors: state.successorFeats,
    history: state.history,
    bookmarks: state.bookmarks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSuccessors: id => dispatch(getSuccessorFeats(id)),
    toggleSidebar: () => dispatch({ type: SIDEBAR }),
    gotoConnectedFeat: (current, next) =>
      dispatch(gotoConnectedFeat(current, next)),
    goBackInHistory: (historyIdx, featKey) =>
      dispatch(historyBack(historyIdx, featKey)),
    addBookmark: featKey => dispatch(addBookmark(featKey)),
    removeBookmark: featKey => dispatch(removeBookmark(featKey))
  };
};

const ConnectedFeatDetail = connect(mapStateToProps, mapDispatchToProps)(
  FeatDetail
);

export default ConnectedFeatDetail;
