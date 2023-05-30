import MarkdownPreview from '@uiw/react-markdown-preview';
import { Tooltip } from 'antd';
import React from 'react';
import type { MessageProps } from './typing';

export const Message: React.FC<MessageProps> = (props) => {
  const { role, content, timestamp } = props;

  const disablePreview = role === 'user' && !content.includes('`');

  const time = new Date(timestamp).toLocaleString();

  const style = {
    borderRadius: 5,
    padding: '10px 16px',
  };

  /**
   * markdown 预览工具对于 ``` 语法的支持不够好
   * 为了避免出现预览不正确的情况，这里将 ``` 语法替换为 ```js
   * @param str
   */
  const getLegalContent = (str: string) => {
    // 存在 ```xx 语法，不做处理
    if (str.match(/```[\S]+/g) !== null) return str;
    // 存在 ``` 语法，替换为 ```js
    return str.replace(/```[\s]*\n([\s\S]*?)```/g, '```js\n$1```');
  };

  return (
    <Tooltip title={time}>
      <div>
        {disablePreview ? (
          <div style={style} className="message-content">
            {content}
          </div>
        ) : (
          <MarkdownPreview
            className="message-content"
            style={style}
            source={getLegalContent(content)}
          />
        )}
      </div>
    </Tooltip>
  );
};
