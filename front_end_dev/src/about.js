import React from "react";
import { Grid, Image, Segment, Container, Divider } from "semantic-ui-react";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Grid centered>
          <h1>About Flamongo</h1>
        </Grid>
        <Grid style={{ padding: "20px" }} centered>
          <h5>
            Flamongo is an integrated system designed for testings with
            customized data.
          </h5>
        </Grid>
        <Divider></Divider>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>
                <h2>Database: MongoDB</h2>
                <p>
                  Flamongo is backed by MongoDB, allowing users to store data of
                  variable patterns within one single collection conveniently.
                </p>
                <Image
                  centered
                  src={require("./mongodb-logo.png")}
                  size="small"
                ></Image>
              </Segment>
              <Segment>
                <h2>Backend: Flask</h2>
                <p>
                  The backend is written in highly-modularized python, hence is
                  light-weight highly expandable.
                </p>
                <Image
                  centered
                  src={require("./flask-logo.jpg")}
                  size="small"
                ></Image>
              </Segment>
              <Segment>
                <h2>Frontend: React.js</h2>
                <p>
                  Flamongo's GUI is designed with React.js, which offers a
                  dynamic and smooth experience for users.
                </p>
                <Image
                  centered
                  src={require("./react-logo.png")}
                  size="small"
                ></Image>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <h1>Customization</h1>
                <p>
                  Flamongo gives the power of directly manipulating collections
                  to the users. Therefore a Flamongo server is capable of
                  fulfilling testing needs of multiple teams.
                </p>
              </Segment>
              <Segment>
                <h1>hi.</h1>
              </Segment>
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
