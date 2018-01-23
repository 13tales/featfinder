import React, { PureComponent as Component } from "react";
/* import {
  *   Breadcrumb,
  *   Grid,
  *   Grid.Row,
  *   Nav,
  *   NavItem,
  *   Grid.Column,
  *   FormControl,
  *   ControlLabel,
  *   Form,
  *   FormGroup,
  *   ListGroup,
  *   ListGroupItem
  * } from "react-bootstrap";
*/
import { ResultList } from "../components/resultlist.js";
import { Segment, Container, Grid, Menu } from "semantic-ui-react";
import { default as FeatDetail } from "../components/featDetail.js";
import { SearchBox } from "../components/searchbox.js";
import { TabNav } from "../components/tabbed_nav.js";
import { SearchOptions } from "../components/searchOptions.js";
import { connect } from "react-redux";
import {
  inputText,
  initApp,
  SEARCH_OPTIONS,
  selectFeat
} from "../actions/actions.js";
import { Route } from "react-router-dom";
import { push } from "react-router-redux";
import { PageSpinner } from "../components/spinner.js";

class App extends Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
      <Container style={{ height: "100%", maxHeight: "100%" }}>
        {this.props.pending.feats === false ? (
          <Grid style={{ height: "95%" }}>
            <Grid.Row />
            <Grid.Row columns={2} style={{ height: "100%" }}>
              <Grid.Column width={6} style={{ height: "100%" }}>
                <SearchBox
                  handleInput={this.props.handleInput}
                  input={this.props.input}
                  toggleOptions={this.props.toggleSearchOptions}
                />
                {this.props.pending.feats === true ? (
                  <PageSpinner size="6x" />
                ) : (
                  <Segment style={{ height: "100%", overflowY: "scroll" }}>
                    <Route
                      path="/feat/:name"
                      children={({ match }) => (
                        <ResultList
                          selected={match && match.params.name}
                          results={this.props.results}
                          input={this.props.input}
                          handleClick={this.props.handleFeatClick}
                        />
                      )}
                    />
                  </Segment>
                )}
              </Grid.Column>
              <Grid.Column
                width={10}
                style={{ height: "100%", overflowY: "scroll" }}
              >
                <Route
                  path="/feat/:name"
                  feats={this.props.results}
                  component={FeatDetail}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <PageSpinner size="6x" />
        )}
      </Container>
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
    handleInput: input => {
      dispatch(inputText(input));
    },
    initApp: () => {
      dispatch(initApp());
    },
    toggleSearchOptions: () => dispatch({ type: SEARCH_OPTIONS }),
    handleFeatClick: key => dispatch(selectFeat(key))
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
