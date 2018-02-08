import React, { PureComponent as Component } from "react";
import {
  Accordion,
  Icon,
  Header,
  Segment,
  Label,
  List
} from "semantic-ui-react";

class CategorySubList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true
    };
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <div>
        <Accordion.Title
          active={this.state.expanded}
          as={List.Header}
          onClick={this.handleClick}
          style={{ marginTop: "1em" }}
        >
          <Icon name="dropdown" />
          {this.props.featType}
          <Label
            circular
            content={this.props.count > 100 ? "100+" : this.props.count}
            style={{ marginLeft: "1em" }}
          />
        </Accordion.Title>
        <Accordion.Content active={this.state.expanded}>
          <List celled relaxed selection>
            {this.props.featList}
          </List>
        </Accordion.Content>
      </div>
    );
  }
}

export default CategorySubList;
