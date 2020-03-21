import React from "react";
import { Menu, Container, Divider, Image } from "semantic-ui-react";

export default class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Dashboard",
      collections: [],
      activeCollection: "test_cases"
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.onOptionChange({ newOption: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Container>
        <Image centered src={require("./cecropiia.png")} size="small"></Image>
        <Menu vertical style={{ width: "100%" }}>
          <Menu.Item
            name="Dashboard"
            active={activeItem === "Dashboard"}
            onClick={this.handleItemClick}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            name="Collections"
            active={activeItem === "Collections"}
            onClick={this.handleItemClick}
          >
            Database Management
          </Menu.Item>
          {/* <Menu.Item
            name="Documents"
            active={activeItem === "Documents"}
            onClick={this.handleItemClick}
          >
            Documents
          </Menu.Item> */}
          <Divider></Divider>

          <Menu.Item
            name="Setting"
            active={activeItem === "Setting"}
            onClick={this.handleItemClick}
          >
            Setting
          </Menu.Item>

          <Menu.Item
            name="About"
            active={activeItem === "About"}
            onClick={this.handleItemClick}
          >
            About
          </Menu.Item>
        </Menu>
      </Container>
    );
  }
}
