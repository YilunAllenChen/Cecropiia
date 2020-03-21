import React from "react";
import { Grid, Container, Divider } from "semantic-ui-react";
import CanvasJSReact from "./canvasjs.react";
import { api_getAllDocuments } from "./apis";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartConfig: {
        title: {
          text: "Basic Column Chart in React"
        },
        data: [
          {
            type: "line",
            dataPoints: [
              { label: "Apple", y: 10 },
              { label: "Orange", y: 15 },
              { label: "Banana", y: 25 },
              { label: "Mango", y: 30 },
              { label: "Grape", y: 28 }
            ]
          }
        ]
      }
    };
    this.fetchData();
  }

  fetchData() {
    api_getAllDocuments("Slothbot_Public_Data").then(res => {
      let dataTypes = ["temperature", "humidity", "vibration"];
      let dataSets = [];
      let item;
      for (let dataTypeNdx in dataTypes) {
        dataSets[dataTypeNdx] = {
          type: "line",
          dataPoints: []
        };
        for (let entryNdx in res) {
          dataSets[dataTypeNdx].dataPoints.push({
            label: res[entryNdx].id,
            y: res[entryNdx][dataTypes[dataTypeNdx]]
          });
        }
      }

      this.setState({
        chartConfig: {
          title: {
            text: "Basic Column Chart in React"
          },
          data: dataSets
        }
      });
    });
  }

  async componentDidMount() {
    try {
      setInterval(async () => {
        // const res = await fetch("https://api.apijson.com/...");
        // const blocks = await res.json();
        // const dataPanelone = blocks.panelone;
        // const dataPaneltwo = blocks.paneltwo;
        this.fetchData();
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Container>
        <Grid style={{ padding: "20px" }} centered>
          <h1>Cecropia Dashboard</h1>
        </Grid>
        <Divider></Divider>
        <Grid columns="equal">
          <CanvasJSChart
            options={this.state.chartConfig}
            /* onRef = {ref => this.chart = ref} */
          />
        </Grid>
      </Container>
    );
  }
}
