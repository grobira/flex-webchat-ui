
import React from 'react';
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import { Icon } from '@twilio/flex-ui';

const CallbackButton = (props) => {
  return (
    <button className="button" ><Icon icon="CallBold" /></button>
  );
}

const SmsButton = (props) => {
  return (
    <button className="button" ><Icon icon="MessageBold" /></button>
  );
}

const ChatButton = (props) => {
  return (
    <button className="button" ><Icon icon="SendLarge" /></button>
  );
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

    FlexWebChat.MainContainer.Content.add(
      <div key="button-icon-bar">
        <SmsButton />
        <CallbackButton />
        <ChatButton />
      </div>, {})
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

