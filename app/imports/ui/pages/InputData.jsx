import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Discover, Yeelight, logger } from 'yeelight-awesome';

/** Renders the Page for adding a document. */
class InputData extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.turnOn = this.turnOn.bind(this);
  }

  /** On submit, insert the data. */
  turnOn() {
    const discover = new Discover({ debug: true }, logger);
    discover.start().then((devices) => {
      const device = devices[0];
      logger.info('found device: ', devices);
      const yeelight = new Yeelight({ lightIp: device.host, lightPort: device.port });

      yeelight.connect().then((l) => {
        l.toggle().then(() => {
          logger.info('The light has been toggled');
          // you need to call disconnect and destroy when you finish
          l.disconnect();
          discover.destroy();
        });
      });

    }).catch((e) => {
      logger.error(e);
      discover.destroy();
    });
  }


  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Container>
          <Button onClick={this.turnOn}>Toggle</Button>
        </Container>
    );
  }
}

export default InputData;
