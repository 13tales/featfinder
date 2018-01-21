import React, { PureComponent as Component } from "react";
import {
  Grid,
  Row,
  Nav,
  NavItem,
  Col,
  FormControl,
  ControlLabel,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { ResultList } from "../components/resultlist.js";
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
      <div style={{ height: "100%" }}>
        <TabNav />
        {this.props.pending.feats === false ? (
          <Grid style={{ height: "85%" }}>
            <Row>
              <h3>Search</h3>
              <Col sm={12}>
                <SearchBox
                  handleInput={this.props.handleInput}
                  input={this.props.input}
                  toggleOptions={this.props.toggleSearchOptions}
                />
              </Col>
            </Row>
            <Row>
              <SearchOptions show={this.props.ui.showSearchOptions} />
            </Row>
            <Row style={{ height: "100%" }}>
              <Col
                sm={6}
                style={{
                  height: "100%",
                  overflow: "scroll"
                }}
              >
                {this.props.pending.feats === true ? (
                  <PageSpinner size="6x" />
                ) : (
                  <ResultList
                    results={this.props.results}
                    input={this.props.input}
                    handleClick={this.props.handleFeatClick}
                  />
                )}
              </Col>
              <Col
                sm={6}
                style={{
                  height: "100%",
                  overflow: "scroll"
                }}
              >
                <Route
                  path="/feat/:name"
                  feats={this.props.results}
                  component={FeatDetail}
                />
              </Col>
            </Row>
          </Grid>
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
