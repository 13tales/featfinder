import React, { PureComponent as Component } from "react";
import {
  Tab,
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

const SearchTab = ({
  pending,
  feats,
  input,
  handleFeatClick,
  toggleSidebar,
  handleInput
}) => (
  <div>
    <SearchBox handleInput={handleInput} input={input} />

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
  </div>
);

const ffSidebar = ({
  pending,
  visible,
  input,
  feats,
  handleFeatClick,
  handleInput,
  toggleSidebar,
  bookmarks
}) => {
  const panes = [
    {
      menuItem: "Search",
      render: () => (
        <Tab.Pane>
          <SearchTab
            pending={pending}
            feats={feats}
            input={input}
            handleFeatClick={handleFeatClick}
            toggleSidebar={toggleSidebar}
            handleInput={handleInput}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Bookmarks",
      render: () => (
        <Tab.Pane>
          <Route
            path="/feat/:name"
            children={({ match }) => (
              <ResultList
                selected={match && match.params.name}
                results={bookmarks.map(k => feats.get(k)).toMap()}
                input={"."}
                handleClick={handleFeatClick}
              />
            )}
          />
        </Tab.Pane>
      )
    }
  ];
  return (
    <Sidebar width="wide" as={Segment} visible={visible} animation="overlay">
      <Button
        icon="chevron left"
        circular
        basic
        floated="right"
        onClick={toggleSidebar}
      />
      <Tab panes={panes} />
    </Sidebar>
  );
};

const mapStateToProps = state => {
  return {
    visible: state.uiState.showSidebar,
    input: state.search,
    feats: state.feats,
    pending: state.actionPending,
    bookmarks: state.bookmarks
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
