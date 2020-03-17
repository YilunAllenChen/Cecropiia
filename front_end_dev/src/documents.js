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
import NewDocumentModal from "./newDocumentModal";

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
    fetch("/database/list_collections/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 " // 指定提交方式为表单提交
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        res = JSON.parse(res).result;
        let coll = [];
        for (let ndx in res) {
          coll.push({
            key: res[ndx],
            text: res[ndx],
            value: res[ndx]
          });
        }
        this.setState({ collections: coll });
      });
  }

  getAllDocuments() {
    fetch("/database/get_all_documents/", {
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
        let documents = [];
        res = JSON.parse(res).result;
        for (let ndx in res) {
          documents.push(res[ndx]);
        }
        this.setState({ documents: documents });
      });
  }

  deleteThisDocument(id){
    fetch("/database/delete_document/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 " // 指定提交方式为表单提交
      }),
      body: JSON.stringify({
        collection: this.activeCollection,
        id: JSON.parse(id)
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        this.getAllDocuments();
      });
  };


  generateRandomDocument = () => {
    fetch("/database/write_document/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 " // 指定提交方式为表单提交
      }),
      body: JSON.stringify({
        collection: this.activeCollection,
        date: "0",
        mockTimeSlot: "",
        mockTrafficRes:
          '{"code":"0","data":{"totalFine":"200","totalPoints":"2","untreatedNum":"1","violationDtoList":[{"address":"朝阳门","canSelect":"1","city":"北京","fine":"600","id":1569399107247,"markFee":"2","needTravelLicense":"0","organName":"北京公安局朝阳分局","paymentStatus":"1","plateNo":"京A02302930","point":"4","processStatus":"1","processStatusName":"处理中","provinceName":"北京","reason":"违反禁止标线指示","serviceFee":"20","violationNum":"1625","violationTime":"2019-07-02 10:12:13","violationWritNo":"京A02302930"}]},"msg":"成功"}',
        newViolationCount: "1",
        latitude: "39.93700833346261",
        carNum: "京88888",
        vehicleNum: "AUTOMATED01050627",
        des: "这是一条随机生成的数据",
        mockHoliday: "null",
        name: "[vg6_all_rule_006][首次上午开机_元旦节_天气多云_有一条新违章]",
        id: JSON.stringify(Math.random() * 1000),
        hisViolationCount: "0",
        mockWeather:
          '{"content":{"alert":{"content":"","level":"","title":""},"forecast7d":[{"highTemp":"0","lowTemp":"-5"}],"lives":{"temperature":"-2","weather":"多云","weatherCode":"01","windDirAngle":"","windDirCode":""},"livesAqi":{"level":"轻度污染","value":"101"}},"msg":"成功","msgCode":"10000","status":1,"total":1}',
        longitude: "116.41711885253399",
        mockDate: "1546302000000"
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        console.log(res);
        this.getAllDocuments();
      });
  };

  handleCollectionSelecion = (e, { value }) => {
    this.activeCollection = value;
    this.getAllDocuments();
  };

  render() {
    let { collections } = this.state;
    let cards = [];
    for (let ndx in this.state.documents) {
      let id = JSON.stringify(this.state.documents[ndx].id);
      cards.push(
        <Document
          id={id}
          data={this.state.documents[ndx]}
          updateDocuments={() => this.getAllDocuments()}
          key={id}
          delete={()=> this.deleteThisDocument(id)}
        ></Document>
      );
    }
    return (
      <Container>
        <Dropdown
          defaultValue={this.props.collectionSelected}
          selection
          options={collections}
          onChange={this.handleCollectionSelecion}
        ></Dropdown>
        <Divider></Divider>
        <NewDocumentModal
          updateDocuments={() => this.getAllDocuments()}
          currentCollection={this.activeCollection}
        ></NewDocumentModal>
        <Button size="big" positive onClick={this.generateRandomDocument}>
          Generate Random Document
        </Button>
        <Header as="h4">Documents</Header>
        <Divider></Divider>
        <Card.Group className="Card" >{cards}</Card.Group>
      </Container>
    );
  }
}
