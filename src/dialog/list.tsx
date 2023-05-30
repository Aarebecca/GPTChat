import classnames from 'classnames';
import React, { useEffect } from 'react';
import { Message } from './message';
import type { MessageListProps } from './typing';

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const scrollToBottom = () => {
    const list = document.querySelector('.list');
    if (list) {
      list.scrollTo({
        top: list.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="list">
      {messages.map((message) => (
        <div
          key={message.timestamp}
          className={classnames('message', message.role)}
        >
          <Message {...message} />
        </div>
      ))}
    </div>
  );
};
