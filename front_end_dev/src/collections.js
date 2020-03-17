import React from "react";
import {
  Header,
  Container,
  Divider,
  Icon,
  Form,
  Card,
  Button
} from "semantic-ui-react";
import {
  api_listCollections,
  api_dropCollection,
  api_writeDocument
} from "./apis";

export default class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      collection: "",
      id: "",
      des: ""
    };
    this.getAllCollections();
  }

  getAllCollections() {
    api_listCollections().then(res => {
      this.setState({ collections: res });
    });
  }

  dropThisCollection = (e, { id }) => {
    api_dropCollection(id).then(res => {
      this.getAllCollections();
    });
  };

  submitForm = () => {
    api_writeDocument({
      collection: this.state.collection,
      id: this.state.id,
      des: this.state.des
    }).then(res => {
      this.getAllCollections();
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {});
  };

  render() {
    let collections = [];
    for (let ndx in this.state.collections) {
      let id = this.state.collections[ndx];
      collections.push(
        <Card value={id} key={id}>
          <Card.Content>
            <Icon size="large" name="database"></Icon>
            <Divider></Divider>
            <Card.Header>{id}</Card.Header>
            <Card.Description>
              {JSON.stringify(this.state.collections[ndx].des)}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui three buttons">
              <Button basic color="green">
                Check
              </Button>
              <Button
                basic
                color="green"
                onClick={() => {
                  this.props.onViewCollection(id);
                }}
              >
                Edit
              </Button>
              <Button
                id={id}
                basic
                color="red"
                onClick={this.dropThisCollection}
              >
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    }

    return (
      <Container>
        <Form onSubmit={this.submitForm}>
          <Header as="h4">Add New Collection</Header>
          <Form.Group widths={3}>
            <Form.Field>
              <label>collection name</label>
              <input
                placeholder="collection"
                value={this.state.collection}
                name="collection"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Placeholder Document id</label>
              <input
                placeholder="id"
                value={this.state.firstName}
                name="id"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder="des"
                value={this.state.firstName}
                name="des"
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Button type="submit" onClick={this.submitForm}>
            Submit
          </Button>
        </Form>
        <Divider></Divider>
        <Header as="h4">Collections</Header>
        <Card.Group className="Card">{collections}</Card.Group>
      </Container>
    );
  }
}
