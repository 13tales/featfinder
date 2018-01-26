import React, { PureComponent as Component } from "react";
import {
  Button,
  Sticky,
  Rail,
  Sidebar,
  Segment,
  Container,
  Grid,
  Menu
} from "semantic-ui-react";
import { SearchBox } from "../components/searchbox.js";
import { ResultList } from "../components/resultlist.js";
import { PageSpinner } from "../components/spinner.js";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import {
  inputText,
  initApp,
  SEARCH_OPTIONS,
  selectFeat,
  SIDEBAR
} from "../actions/actions.js";

const ffSidebar = ({
  pending,
  visible,
  input,
  feats,
  handleFeatClick,
  handleInput,
  toggleSidebar
}) => (
  <Sidebar width="wide" as={Segment} visible={visible} animation="overlay">
    <SearchBox handleInput={handleInput} input={input} />
    <Button
      icon="chevron left"
      circular
      basic
      floated="right"
      onClick={toggleSidebar}
    />
    {pending.feats === true ? (
      <PageSpinner size="6x" />
    ) : (
      <Segment style={{ maxHeight: "97%", overflowY: "scroll" }}>
        <Route
          path="/feat/:name"
          children={({ match }) => (
            <ResultList
              selected={match && match.params.name}
              results={feats}
              input={input}
              handleClick={handleFeatClick}
            />
          )}
        />
      </Segment>
    )}
  </Sidebar>
);

const mapStateToProps = state => {
  return {
    visible: state.uiState.showSidebar,
    input: state.search,
    feats: state.feats,
    pending: state.actionPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => dispatch({ type: SIDEBAR }),
    handleInput: input => {
      dispatch(inputText(input));
    },
    handleFeatClick: key => {
      dispatch(selectFeat(key));
      dispatch({ type: SIDEBAR });
    }
  };
};

const ConnectedSidebar = connect(mapStateToProps, mapDispatchToProps)(
  ffSidebar
);

export default ConnectedSidebar;
