import React, { PureComponent as Component } from "react";
import { Grid, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import { ConnectedFeatTable } from "../components/featTable.jsx";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { sortColumn: "name", direction: "ascending", activePage: 1 };
    this.handleSort = this.handleSort.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleSort(clickedColumn) {
    if (this.state.sortColumn !== clickedColumn) {
      this.setState({
        sortColumn: clickedColumn,
        direction: "ascending"
      });
    } else {
      this.setState({
        direction:
          this.state.direction === "ascending" ? "descending" : "ascending"
      });
    }
  }

  handlePageChange(e, { activePage }) {
    this.setState({ activePage });
  }

  render() {
    return (
      <Grid container>
        <Grid.Row centered>
          <Pagination
            activePage={this.state.activePage}
            totalPages={Math.ceil(this.props.feats.count() / 50)}
            onPageChange={this.handlePageChange}
          />
        </Grid.Row>
        <Grid.Row>
          <ConnectedFeatTable
            sortColumn={this.state.sortColumn}
            handleSort={this.handleSort}
            sortDirection={this.state.direction}
            page={this.state.activePage}
          />
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    feats: state.featCache
  };
};
const mapDispatchToProps = () => {
  return {};
};

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(
  HomePage
);

export default ConnectedHomePage;
