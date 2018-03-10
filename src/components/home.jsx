import React, { PureComponent as Component } from "react";
import { Table, Container, Header, Segment, List } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectFeat } from "../actions/actions.js";
import { Item } from "../components/resultlist.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  render() {
    return (
      <Container>
        <Header content="Feats, old and new!" />
        <Segment>
          <Table padded selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4}>Feat</Table.HeaderCell>
                <Table.HeaderCell width={5}>Benefit</Table.HeaderCell>
                <Table.HeaderCell>Pre-requisite count</Table.HeaderCell>
                <Table.HeaderCell>Successor count</Table.HeaderCell>
                <Table.HeaderCell>Feat 'level'</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.featCache
                .valueSeq()
                .slice(0, 100)
                .map(f => (
                  <FeatRow feat={f} handleSelect={this.props.handleFeatClick} />
                ))}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    );
  }
}

const FeatRow = ({ feat, handleSelect }) => (
  <Table.Row
    key={feat.id}
    verticalAlign="top"
    onClick={() => {
      handleSelect({ key: feat.key });
    }}
  >
    <Table.Cell>
      <Header as="h5" content={feat.name} />
      <p>{`${feat.description.split(".")[0]}…`}</p>
    </Table.Cell>
    <Table.Cell content={`${feat.benefit.split(".")[0]}…`} />
    <Table.Cell content={feat.req_count} />
    <Table.Cell content={feat.succ_count} />
    <Table.Cell content="blah" />
  </Table.Row>
);

const mapStateToProps = state => {
  return {
    featCache: state.featCache
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFeatClick: key => dispatch(selectFeat(key))
  };
};

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;
