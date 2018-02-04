import React, { PureComponent as Component } from "react";
import { Input, Menu } from "semantic-ui-react";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { timerId: null };
  }

  handleSearchInput(e) {
    if (this.state.timerId) clearTimeout(this.state.timerId);
    this.props.setSearchPending();
    let value = e.target.value;
    return this.setState({
      timerId: setTimeout(() => {
        this.props.handleInput(value);
      }, 600)
    });
  }

  render() {
    return (
      <Input
        icon="search"
        placeholder="Search..."
        onChange={this.handleSearchInput.bind(this)}
        fluid
      />
    );
  }
}
export { SearchBox };
