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
import { FeatDetail } from "../components/featDetail.js";
import { SearchBox } from "../components/searchbox.js";
import { TabNav } from "../components/tabbed_nav.js";
import { connect } from "react-redux";
import { inputText, initDB, selectFeat } from "../actions/actions.js";

class App extends Component {
  componentDidMount() {
    this.props.initDB();
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <TabNav />
        <Grid style={{ height: "85%" }}>
          <Row>
            <h3>Feat search</h3>
            <SearchBox
              handleInput={this.props.handleInput}
              input={this.props.input}
            />
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
              />
            </Col>
            <Col
              sm={6}
              style={{
                height: "100%",
                overflow: "scroll"
              }}
            >
              <FeatDetail feat={this.props.selected} />
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
    input: state.search.input,
    results: state.search.results,
    selected: state.selected
  };
};

// This function accepts the dispatch function, and returns a callback to be passed to components.
const mapDispatchToProps = dispatch => {
  return {
    handleInput: input => {
      dispatch(inputText(input));
    },
    initDB: () => {
      dispatch(initDB());
    },
    selectFeat: f => dispatch(selectFeat(f))
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
