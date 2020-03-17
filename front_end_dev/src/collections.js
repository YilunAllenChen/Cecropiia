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
    fetch("/database/list_collections/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 " // 指定提交方式为表单提交
      }),
      body: JSON.stringify({
        collection: this.activeCollection
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        let collections = [];
        res = JSON.parse(res).result;
        for (let ndx in res) {
          let id = res[ndx];
          collections.push(
            <Card value={id} key={id}>
              <Card.Content>
                <Icon size="large" name="database"></Icon>
                <Divider></Divider>
                <Card.Header>{id}</Card.Header>
                <Card.Description>
                  {JSON.stringify(res[ndx].des)}
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
        this.setState({ collections: collections });
      });
  }

  dropThisCollection = (e, { id }) => {
    fetch("/database/drop_collection/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 " // 指定提交方式为表单提交
      }),
      body: JSON.stringify({
        collection: id
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        this.getAllCollections();
      });
  };

  submitForm = () => {
    fetch("/database/write_document/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 " // 指定提交方式为表单提交
      }),
      body: JSON.stringify({
        collection: this.state.collection,
        id: this.state.id,
        des: this.state.des
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        this.getAllCollections();
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state)
    );
  };

  render() {
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
          <Button type="submit">Submit</Button>
        </Form>
        <Divider></Divider>
        <Header as="h4">Collections</Header>
        <Card.Group className="Card">{this.state.collections}</Card.Group>
      </Container>
    );
  }
}
