import React from "react";
import {
  Header,
  Icon,
  Button,
  Modal,
  Form,
  Segment,
  Grid
} from "semantic-ui-react";

export default class NewDocumentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      open: false,
      newField: {}
    };
  }

  uploadEditedDocument() {
    let document = this.state.data;
    delete document["_id"];
    fetch("/write_document/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 " // 指定提交方式为表单提交
      }),
      body: JSON.stringify(document)
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        res = JSON.parse(res).result;
        console.log(res);
      });
    this.props.updateDocuments();
  }

  render() {
    let { data } = this.state;
    let fields = [];
    for (let ndx in data) {
      fields.push(
        data[ndx].length < 80 ? (
          <Grid key={ndx}>
            <Grid.Column width={10}>
              <Form.Input
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
            </Grid.Column>
            <Grid.Column verticalAlign={"bottom"} width={2}>
              <Button
                onClick={() => {
                  let { data } = this.state;
                  delete data[ndx];
                  this.setState({ data: data });
                }}
              >
                Delete
              </Button>
            </Grid.Column>
          </Grid>
        ) : (
          <Form.TextArea key={ndx} label={ndx} defaultValue={data[ndx]} />
        )
      );
    }

    return (
      <Modal
        trigger={
          <Button
            size="big"
            positive
            onClick={() => {
              this.setState({
                data: { id: JSON.stringify(Math.random() * 1000), collection: this.props.currentCollection },
                open: true
              });
            }}
          >
            New Document
          </Button>
        }
        open={this.state.open}
      >
        <Header icon="archive" content="New Document" />
        <Modal.Content>
          <Segment>
            <Form unstackable>
              <Form.Input
                key="key"
                name="key"
                fluid
                placeholder="key"
                onChange={({ target }) => {
                  let temp = this.state.newField;
                  temp["Key"] = target.value;
                  this.setState({ newField: temp });
                }}
              />
              <Form.Input
                key="value"
                name="value"
                fluid
                placeholder="value"
                onChange={({ target }) => {
                  let temp = this.state.newField;
                  temp["Value"] = target.value;
                  this.setState({ newField: temp });
                }}
              />
            </Form>
          </Segment>
          <Button
            onClick={() => {
              let { data, newField } = this.state;
              data[newField["Key"]] = newField["Value"];
              this.setState({ data: data });
            }}
          >
            Add Key-Value Pair
          </Button>
          <Segment>
            <Form unstackable>{fields}</Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.setState({ open: false })}>
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
    );
  }
}
