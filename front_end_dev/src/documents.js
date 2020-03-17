import React from "react";
import {
  Header,
  Container,
  Dropdown,
  Divider,
  Card,
  Button
} from "semantic-ui-react";
import Document from "./document";
import {
  api_getAllDocuments,
  api_listCollections,
  api_deleteDocument,
  api_generateRandomDocument
} from "./apis";

export default class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.activeCollection = this.props.collectionSelected;
    this.state = {
      collections: [],
      documents: [],
      edit_document: {},
      edit_open: false
    };
    this.getAllCollections();
    this.getAllDocuments();
  }

  getAllCollections() {
    api_listCollections().then(res => {
      this.setState({ collections: res });
    });
  }

  getAllDocuments() {
    api_getAllDocuments(this.activeCollection).then(res => {
      this.setState({ documents: res });
    });
  }

  deleteThisDocument(id) {
    api_deleteDocument({
      collection: this.activeCollection,
      id: JSON.parse(id)
    }).then(res => {
      this.getAllDocuments();
    });
  }

  generateRandomDocument = () => {
    console.log("Active: " + this.activeCollection)
    api_generateRandomDocument(this.activeCollection).then(res => {
      console.log(res);
      this.getAllDocuments();
    });
  };

  handleCollectionSelecion = (e, { value }) => {
    this.activeCollection = value;
    this.getAllDocuments();
  };

  render() {
    let { collections, documents } = this.state;
    let cards = [];
    for (let ndx in documents) {
      let id = JSON.stringify(documents[ndx].id);
      cards.push(
        <Document
          id={id}
          data={documents[ndx]}
          updateDocuments={() => this.getAllDocuments()}
          key={id}
          delete={() => this.deleteThisDocument(id)}
        ></Document>
      );
    }
    let options = [];
    for (let ndx in collections) {
      options.push({
        key: collections[ndx],
        text: collections[ndx],
        value: collections[ndx]
      });
    }

    return (
      <Container>
        <Dropdown
          defaultValue={this.props.collectionSelected}
          selection
          options={options}
          onChange={this.handleCollectionSelecion}
        ></Dropdown>
        <Divider></Divider>
        <Button size="big" positive onClick={this.generateRandomDocument}>
          Generate Random Document
        </Button>
        <Header as="h4">Documents</Header>
        <Divider></Divider>
        <Card.Group className="Card">{cards}</Card.Group>
      </Container>
    );
  }
}
