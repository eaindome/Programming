// FortiClientForm.js
import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import axios from 'axios';
import SendLinkModal from '../Modals/SendLinkModal';

const FortiClientForm = ({ vpn_id, initialValues }) => {
  const [componentSize, setComponentSize] = useState('default');
  const [modalVisible, setModalVisible] = useState(false);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = async (values) => {
    try {
      if (vpn_id) {
        // Update mode
        const response = await axios.put(`/update-forticlient-data/${vpn_id}`, values);
        console.log(response.data);
      } else {
        // Create mode
        const response = await axios.post('/create-forticlient', values);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={initialValues || { size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        >
        <Form.Item label="Form Size" name="size">
            <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="Company Name" name="company_name">
            <Input />
        </Form.Item>
        <Form.Item label="Owner's Name" name="owners_name">
            <Input />
        </Form.Item>
        <Form.Item label="Initial Phone" name="initial_phone">
            <Input />
        </Form.Item>
        <Form.Item label="Current Phone" name="current_phone">
            <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
            <Input />
        </Form.Item>
        <Form.Item label="New Phone" name="new_phone">
            <Input />
        </Form.Item>
        <Form.Item label="Date Requested" name="date_requested">
            <Input />
        </Form.Item>
        <Form.Item label="Button">
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button type="secondary" onClick={() => setModalVisible(true)}>Send Link</Button>
        </Form.Item>
        </Form>
        
        <SendLinkModal visible={modalVisible} setVisible={setModalVisible} />
    </div>
  );
};

export default FortiClientForm;














/**
 * // FortiClientForm.js
import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import axios from 'axios';
import SendLinkModal from '../Modals/SendLinkModal';

const FortiClientForm = ({ vpn_id = null, initialValues = {} }) => {
  const [componentSize, setComponentSize] = useState('default');
  const [modalVisible, setModalVisible] = useState(false);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = async (values) => {
    try {
      if (vpn_id) {
        // Update mode
        const response = await axios.put(`/update-forticlient-data/${vpn_id}`, values);
        console.log(response.data);
      } else {
        // Create mode
        const response = await axios.post('/create-forticlient', values);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize, ...initialValues }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        >
        // ...form items
        </Form>
        
        <SendLinkModal visible={modalVisible} setVisible={setModalVisible} />
    </div>
  );
};

export default FortiClientForm;
 */
