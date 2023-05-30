import React from 'react';
import type { DialogProps, InputProps } from './typing';

export const DialogContext = React.createContext<DialogProps & InputProps>({
  messages: [],
});
