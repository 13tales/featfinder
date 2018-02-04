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
import { default as SearchTab } from "../components/searchPane.js";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import {
  searchFeats,
  initApp,
  SEARCH_OPTIONS,
  selectFeat,
  SIDEBAR,
  selectSearchOption,
  pending
} from "../actions/actions.js";

const ffSidebar = ({
  pending,
  visible,
  input,
  subset,
  cache,
  handleFeatClick,
  handleInput,
  toggleSidebar,
  bookmarks,
  options,
  setOption,
  results,
  setSearchPending
}) => {
  const panes = [
    {
      menuItem: "Search",
      render: () => (
        <Tab.Pane>
          <SearchTab
            pending={pending}
            subset={subset}
            cache={cache}
            input={input}
            handleFeatClick={handleFeatClick}
            toggleSidebar={toggleSidebar}
            handleInput={handleInput}
            searchOption={options}
            handleSelectOption={setOption}
            results={results}
            setSearchPending={setSearchPending}
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
                subset={bookmarks.map(k => cache.get(k)).toArray()}
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
    subset: state.searchSubset,
    pending: state.actionPending,
    bookmarks: state.bookmarks,
    options: state.searchOption,
    cache: state.featCache,
    results: state.searchResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => dispatch({ type: SIDEBAR }),
    handleInput: input => {
      dispatch(searchFeats(input));
    },
    handleFeatClick: key => {
      dispatch(selectFeat(key));
      dispatch({ type: SIDEBAR });
    },
    setSearchPending: () => dispatch(pending({ searchResults: true })),
    setOption: option => dispatch(selectSearchOption(option))
  };
};

const ConnectedSidebar = connect(mapStateToProps, mapDispatchToProps)(
  ffSidebar
);

export default ConnectedSidebar;
