import React, { Component } from 'react';
// import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
} from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';



class StreamChatContainer extends Component {
  async componentWillUnmount() {
    await this.props.streamChatClient.disconnect();
  }

  render() {
    const { streamChannel, streamChatClient, clientDisconnected } = this.props;
    if (clientDisconnected) {
      return <div id="loading-chat-message">Other participant has left</div>;
    } else {
      return (
        <Chat client={streamChatClient} theme={'messaging light'}>
          {streamChannel ? (
            <Channel channel={streamChannel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          ) : (
            <div id="loading-chat-message">
              Waiting for other participant to join
            </div>
          )}
        </Chat>
      );
    }
  }
}

export default StreamChatContainer;