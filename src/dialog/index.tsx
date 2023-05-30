import React from 'react';
import { DialogContext } from './context';
import './index.css';
import { Input } from './input';
import { MessageList } from './list';
import type { DialogProps } from './typing';

export const Dialog: React.FC<DialogProps> = ({
  abortQuery,
  clearMessages,
  messages,
  onSendMessage,
}) => {
  return (
    <DialogContext.Provider
      value={{
        abortQuery,
        clearMessages,
        messages,
        onSendMessage,
        onInput: (content) =>
          onSendMessage
            ? onSendMessage({
                role: 'user',
                content,
                messageStatus: 'pending',
                timestamp: Date.now(),
              })
            : Promise.resolve(false),
      }}
    >
      <div className="dialog-content">
        <MessageList messages={messages} />
        <Input />
      </div>
    </DialogContext.Provider>
  );
};
