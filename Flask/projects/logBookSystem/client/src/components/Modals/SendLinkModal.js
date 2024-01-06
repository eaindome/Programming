// src/components/Modals/SendLinkModal.js
import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';

const SendLinkModal = ({ open, setVisible }) => {
  const onSendLink = async (values) => {
    try {
      const response = await axios.post('/send_link', values);
      console.log(response.data);
      setVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Send Link"
      open={open}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onSendLink}
      >
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Table Name" name="table_name">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Send Link</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendLinkModal;
