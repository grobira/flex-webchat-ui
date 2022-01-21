
import React from 'react';
import * as FlexWebChat from "@twilio/flex-webchat-ui";

const CallbackCanvasComponent = (props) => {

  const styles = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: "red",
  }
  return (
    <div style={styles}>
      <input placeholder="Phone Number" />
      <button>Request a callback</button>
    </div>
  )
}

const SmSCanvasComponent = (props) => {

  const styles = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: "blue",
  }
  return (
    <div style={styles}>
      <input placeholder="Phone Number" />
      <input placeholder="Description" />
      <button>Send me a SMS</button>
    </div>
  )
}

class App extends React.Component {

  state = {};

  constructor (props) {
    super(props);

    const { configuration } = props;
    FlexWebChat.Manager.create(configuration)
      .then(manager => {
        this.setState({ manager })
      })
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    FlexWebChat.MainContainer.Content.add(
      <div key="button-icon-bar">
        <button className="button" key="sms" onClick={() => this.activateCavas("sms")}>sms</button>
        <button className="button" key="webchat" onClick={() => this.activateCavas("webchat")}>webchat</button>
        <button className="button" key="callback" onClick={() => this.activateCavas("callback")}>callback</button>
      </div>, {})

    FlexWebChat.MessagingCanvas.Content.replace(<SmSCanvasComponent key="sms-component" />, {
      sortOrder: 100,
      if: (props) => this.state.activeCanvas === "sms"
    })

    FlexWebChat.MessagingCanvas.Content.replace(<CallbackCanvasComponent key="callback-component" />, {
      sortOrder: 100,
      if: (props) => {
        return this.state.activeCanvas === "callback"
      }
    })
  }

  activateCavas(canvas) {
    this.setState({ activeCanvas: canvas })
  }


  render() {
    const { manager, error } = this.state;

    if (manager) {
      return (
        <FlexWebChat.ContextProvider manager={manager}>
          <FlexWebChat.RootContainer />
        </FlexWebChat.ContextProvider>
      );
    }

    if (error) {
      console.error("Failed to initialize Flex Web Chat", error);
    }

    return null;
  }
}

export default App;

