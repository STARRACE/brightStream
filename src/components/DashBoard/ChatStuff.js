import React, { useContext, useState } from 'react';
import {
  Avatar,
  ChatContext,
  MessageActions,
  useMessageContext,
} from 'stream-chat-react';

import { LiveEventReactions } from './LiveEventReactions.js';

import { OnlineIndicator } from './Assets/OnlineIndicator.js';
import { PinIcon } from './Assets/PinIcon.js';
import { PinIconDark } from './Assets/PinIconDark';
import AvatarRobertImg from './Assets/AvatarRobertImg.png';

import './LiveEventMessage.css';

const LiveEventMessage = (props) => {
  const { pinnedMessagesIds, setPinnedMessages } = props;

  const { isMyMessage, message } = useMessageContext();

  const isMessagePinned = pinnedMessagesIds?.find((id) => id === message.id);
  const [isPinned, setIsPinned] = useState(isMessagePinned);

  const { theme } = useContext(ChatContext);

  const onlineStatus = message.user?.id === 'avatar-robert';

  const MyUserAvatar = (props) => {
    if (isMyMessage()) {
      return <Avatar {...props} image={AvatarRobertImg} name={'Robert'} />;
    }
    return <Avatar {...props} />;
  };

  const pinChecker = () => {
    if (!isPinned) {
      setIsPinned(true);
      setPinnedMessages((prevMessages) => ({
        ...prevMessages,
        [message.id]: message,
      }));
    } else {
      setIsPinned(false);
      setPinnedMessages((prevMessages) => {
        const copy = { ...prevMessages };
        delete copy[message.id];
        return copy;
      });
    }
  };

  const getMessageActions = () => {
    if (isMyMessage()) {
      return ['edit', 'delete', 'react', 'reply', 'mute'];
    }
    return ['react', 'reply', 'mute'];
  };

  return (
    <div
      className={
        isPinned
          ? 'live-event-message__container__pinned'
          : 'live-event-message__container__unpinned'
      }
    >
      <div className='pin-icon' style={{ marginLeft: '15px' }} onClick={pinChecker}>
        {isPinned ? theme === 'livestream light' ? <PinIcon /> : <PinIconDark /> : null}
      </div>
      <div style={{ position: 'relative' }}>
        {onlineStatus && (
          <div className='online-indicator'>
            <OnlineIndicator />
          </div>
        )}
        <div className='new-actions'>
          <MessageActions
            {...props}
            handleMute={pinChecker}
            getMessageActions={getMessageActions}
          />
        </div>
      </div>
    </div>
  );
};
export default LiveEventMessage;