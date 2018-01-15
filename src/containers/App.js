import React, { Component } from "react";
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
  selectFeat,
  SEARCH_OPTIONS
} from "../actions/actions.js";
import { Route } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <TabNav />
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
              <ResultList
                results={this.props.results}
                handleSelect={this.props.selectFeat}
                selected={this.props.selected}
                input={this.props.input}
              />
            </Col>
            <Col
              sm={6}
              style={{
                height: "100%",
                overflow: "scroll"
              }}
            >
              <Route
                path="/feat/:id"
                feats={this.props.results}
                component={FeatDetail}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

// This function takes the state, and returns the props that we need to pass to components.
const mapStateToProps = state => {
  return {
    input: state.search,
    results: state.feats,
    selected: state.selected,
    ui: state.uiState
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
    selectFeat: f => dispatch(selectFeat(f)),
    toggleSearchOptions: () => dispatch({ type: SEARCH_OPTIONS })
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
