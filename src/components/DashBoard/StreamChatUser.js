import React, { Component } from 'react';
import StreamChatContainer from './Streamchat';

class Plugins extends Component {
  render() {
    return (
      <StreamChatContainer
        localParticipant={this.props.localParticipant}
        remoteParticipant={this.props.remoteParticipant}
        streamChatClient={this.props.streamChatClient}
        streamChannel={this.props.streamChannel}
        clientDisconnected={this.props.clientDisconnected}
      />
    );
  }
}

export default Plugins;