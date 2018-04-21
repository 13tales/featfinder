import React, { PureComponent as Component } from "react";
import {
  Pagination,
  Table,
  Container,
  Header,
  Segment,
  List
} from "semantic-ui-react";
import { connect } from "react-redux";
import { selectFeat } from "../actions/actions.js";
import { Item } from "../components/resultlist.js";
import { sortedFeatSelector } from "../selectors/sortedFeats.js";

const FeatTable = ({
  sortColumn,
  handleSort,
  sortDirection,
  handleFeatClick,
  sortedFeats,
  page
}) => {
  const rangeStart = 50 * (page - 1);
  const rangeEnd = rangeStart + 50;

  return (
    <Segment>
      <Table padded selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sortColumn === "name" ? sortDirection : null}
              width={4}
              onClick={() => handleSort("name")}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "description" ? sortDirection : null}
              width={4}
              onClick={() => handleSort("description")}
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "benefit" ? sortDirection : null}
              width={5}
              onClick={() => handleSort("benefit")}
            >
              Benefit
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "req_count" ? sortDirection : null}
              onClick={() => handleSort("req_count")}
            >
              Prerequisites
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "succ_count" ? sortDirection : null}
              onClick={() => handleSort("succ_count")}
            >
              Successors
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedFeats
            .slice(rangeStart, rangeEnd)
            .map(f => (
              <FeatRow feat={f} key={f.id} handleSelect={handleFeatClick} />
            ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

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
    </Table.Cell>
    <Table.Cell>
      <p>{`${feat.description.split(".")[0]}…`}</p>
    </Table.Cell>
    <Table.Cell content={`${feat.benefit.split(".")[0]}…`} />
    <Table.Cell content={feat.req_count === 0 ? "-" : feat.req_count} />
    <Table.Cell content={feat.succ_count === 0 ? "-" : feat.succ_count} />
  </Table.Row>
);

const mapStateToProps = (state, ownProps) => {
  return {
    sortedFeats: sortedFeatSelector(state, ownProps)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFeatClick: key => dispatch(selectFeat(key))
  };
};

export const ConnectedFeatTable = connect(mapStateToProps, mapDispatchToProps)(
  FeatTable
);
