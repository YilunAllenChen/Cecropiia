import React from "react";
import {
  Header,
  Divider,
  Icon,
  Card,
  Button,
  Modal,
  Form,
  Segment
} from "semantic-ui-react";
import { api_writeDocument } from "./apis";

export default class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      open: false
    };
  }

  uploadEditedDocument() {
    let document = this.state.data;
    delete document["_id"];

    api_writeDocument(document)
      .then(res => {
        console.log(res);
      });

    this.props.updateDocuments();
  }

  render() {
    let { data } = this.state;
    let { id } = this.props;
    let fields = [];
    for (let ndx in data) {
      if (data[ndx] === null) {
        continue;
      }
      if (ndx === "_id" || ndx === "id" || ndx === "collection") {
        fields.push(
          <Form.Input
            key={ndx}
            fluid
            label={ndx}
            placeholder={data[ndx]}
            readOnly
          />
        );
      } else {
        fields.push(
          data[ndx].length < 80 ? (
            <Form.Input
              key={ndx}
              name={ndx}
              fluid
              label={ndx}
              defaultValue={data[ndx]}
              onChange={({ target }) => {
                let temp = this.state.data;
                temp[target.name] = target.value;
                this.setState({ data: temp });
              }}
            />
          ) : (
            <Form.TextArea key={ndx} label={ndx} defaultValue={data[ndx]} />
          )
        );
      }
    }

    return (
      <Card value={id} key={id}>
        <Card.Content>
          <Icon size="large" name="file alternate outline"></Icon>
          <Divider></Divider>
          <Card.Header>{id}</Card.Header>
          <Card.Meta>Document of Collection {this.activeCollection}</Card.Meta>
          <Card.Description>
            {JSON.stringify(this.state.data.des)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui three buttons">
            <Button basic color="green">
              Check
            </Button>
            <Modal
              trigger={
                <Button
                  basic
                  color="green"
                  onClick={() => this.setState({ open: true })}
                >
                  Edit
                </Button>
              }
              open={this.state.open}
            >
              <Header icon="archive" content="Edit Document" />
              <Modal.Content>
                <Segment>
                  <Form unstackable>{fields}</Form>
                </Segment>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="red"
                  onClick={() => this.setState({ open: false })}
                >
                  <Icon name="remove" /> Abort
                </Button>
                <Button
                  color="green"
                  onClick={() => {
                    this.setState({ open: false });
                    this.uploadEditedDocument();
                  }}
                >
                  <Icon name="checkmark" /> Apply
                </Button>
              </Modal.Actions>
            </Modal>
            <Button
              id={id}
              basic
              color="red"
              onClick={() => {
                this.props.delete(id);
              }}
            >
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
