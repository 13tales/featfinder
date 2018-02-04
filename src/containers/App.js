import React, { PureComponent as Component } from "react";
import { ResultList } from "../components/resultlist.js";
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
import { default as FeatDetail } from "../components/featDetail.js";
import { SearchBox } from "../components/searchbox.js";
import { TabNav } from "../components/tabbed_nav.js";
import { SearchOptions } from "../components/searchOptions.js";
import { connect } from "react-redux";
import {
  initApp,
  SEARCH_OPTIONS,
  selectFeat,
  SIDEBAR
} from "../actions/actions.js";
import { Route } from "react-router-dom";
import { push } from "react-router-redux";
import { PageSpinner } from "../components/spinner.js";
import { default as FFSidebar } from "../components/sidebar.js";

class App extends Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
      <div style={{ height: "100%", maxHeight: "100%" }}>
        {this.props.pending.feats === false ? (
          <Sidebar.Pushable>
            <FFSidebar />
            <Sidebar.Pusher
              onClick={() => {
                this.props.ui.showSidebar && this.props.toggleSidebar();
              }}
              style={{ height: "100%", overflowY: "scroll" }}
            >
              <Route
                path="/feat/:name"
                feats={this.props.results}
                component={FeatDetail}
              />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        ) : (
          <PageSpinner size="6x" />
        )}
      </div>
    );
  }
}

// This function takes the state, and returns the props that we need to pass to components.
const mapStateToProps = state => {
  return {
    input: state.search,
    results: state.feats,
    ui: state.uiState,
    pending: state.actionPending
  };
};

// This function accepts the dispatch function, and returns a callback to be passed to components.
const mapDispatchToProps = dispatch => {
  return {
    initApp: () => {
      dispatch(initApp());
    },
    toggleSearchOptions: () => dispatch({ type: SEARCH_OPTIONS }),
    handleFeatClick: key => dispatch(selectFeat(key)),
    toggleSidebar: () => dispatch({ type: SIDEBAR })
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
