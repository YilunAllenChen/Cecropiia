import React from "react";
import { Grid, Container, Divider } from "semantic-ui-react";
import CanvasJSReact from "./canvasjs.react";
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
  }

  async componentDidMount() {
    try {
      setInterval(async () => {
        // const res = await fetch("https://api.apijson.com/...");
        // const blocks = await res.json();
        // const dataPanelone = blocks.panelone;
        // const dataPaneltwo = blocks.paneltwo;

        this.setState({
          chartConfig: {
            title: {
              text: "Basic Column Chart in React"
            },
            data: [
              {
                type: "line",
                dataPoints: [
                  { label: "Apple", y: Math.random() * 10 },
                  { label: "Orange", y: Math.random() * 10 + 10 },
                  { label: "Banana", y: Math.random() * 10 + 7 },
                  { label: "Mango", y: Math.random() * 10 + 12 },
                  { label: "Grape", y: Math.random() * 10 + 16 }
                ]
              }
            ]
          }
        });
      }, 300);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Container>
        <Grid style={{ padding: "20px" }} centered>
          <h1>Flamongo Dashboard</h1>
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
