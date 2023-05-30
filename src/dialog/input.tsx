import {
  CloseOutlined,
  LoadingOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Input as AntdInput, Button, Spin, Tooltip } from 'antd';
import React, { useContext, useState } from 'react';
import { DialogContext } from './context';
import type { InputProps } from './typing';

export const Input: React.FC<InputProps> = (props) => {
  const { abortQuery, onInput, clearMessages } = useContext(DialogContext);
  const { defaultValue = '' } = props;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="input-container">
      {loading && (
        <div className="stop-query">
          <Button icon={<CloseOutlined />} onClick={abortQuery}>
            停止
          </Button>
        </div>
      )}
      <Spin indicator={antIcon} spinning={loading}>
        <AntdInput.TextArea
          autoSize
          value={value}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              const valueToSend = value.trim();
              e.preventDefault();
              if (!!valueToSend) {
                if (!onInput) return;
                setLoading(true);
                onInput(valueToSend).then((res) => {
                  if (res) setValue('');
                  setLoading(false);
                });
              }
            }
          }}
          style={{ maxHeight: '60vh' }}
          onChange={(e) => setValue(e.target.value)}
        />
      </Spin>
      <Tooltip title="新对话" placement="topRight">
        <SyncOutlined className="new-dialog" onClick={clearMessages} />
      </Tooltip>
    </div>
  );
};
