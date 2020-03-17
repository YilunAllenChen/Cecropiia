import React from "react";
import { Grid, Image, Segment, Container, Divider } from "semantic-ui-react";

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Grid style={{padding:"20px"}} centered>
          <h1>Flamongo Dashboard</h1>
        </Grid>
        <Divider></Divider>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
