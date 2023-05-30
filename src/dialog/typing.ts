export type MessageProps = {
  messageStatus: 'pending' | 'success' | 'cancel';
  role: 'system' | 'assistant' | 'user';
  content: string;
  timestamp: number;
};

export type MessageListProps = {
  messages: readonly MessageProps[];
};

export type DialogProps = {
  messages: readonly MessageProps[];
  onSendMessage?: (message: MessageProps) => Promise<boolean>;
  abortQuery?: () => void;
  clearMessages?: () => void;
};

export type InputProps = {
  defaultValue?: string;
  onInput?: (value: string) => Promise<boolean>;
};
