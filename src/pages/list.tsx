import React, { useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select } from 'antd';
const { Option } = Select;
interface Values {
  titleKey: string;
  title: string;
  titleType: string;
  importType?: string;
  enum?: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
export const dynamicForm () => {
    const [titleTypeValue, setTitleTypeValue] = useState<string>(''); //字段类型
    const handleTitleTypeChange = (value: string) => {
      setTitleTypeValue(value);
      form.getFieldValue('importType');
      console.log(form.getFieldValue('importType'));

      form.setFieldValue('importType', ' ');
    };

    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="新增字段"
        okText="新建"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values: Values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="horizontal"
          name="form_in_modal"
          initialValues={{}}
        >
          <Form.Item
            name="titleKey"
            label="字段名"
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="title" label="字段别名">
            <Input type="textarea" />
          </Form.Item>

          <Form.Item name="titleType" label="字段类型">
            <Select placeholder="选择字段类型" onChange={handleTitleTypeChange}>
              <Option value="text">文本</Option>
              <Option value="digital">数字</Option>
              <Option value="boolean">布尔</Option>
              <Option value="time">时间戳</Option>
            </Select>
          </Form.Item>

          {(titleTypeValue === 'text' || titleTypeValue === 'digital') && (
            <Form.Item name="importType" label="录入方式">
              <Select placeholder="Please select a importType">
                <Option value="textBorder">文本框</Option>
                <Option value="radio">单选框</Option>
              </Select>
            </Form.Item>
          )}

          {titleTypeValue === 'boolean' && (
            <Form.Item name="importType" label="录入方式">
              <Select placeholder="Please select a importType">
                <Option value="boolean">单选框</Option>
              </Select>
            </Form.Item>
          )}
          {titleTypeValue === 'time' && (
            <Form.Item name="importType" label="录入方式">
              <Select placeholder="Please select a importType">
                <Option value="timeControl">时间控件</Option>
              </Select>
            </Form.Item>
          )}

          {titleTypeValue === 'boolean' && (
            <Form.Item
              label="枚举"
              name="enum"
              initialValue={'是-true,否-false'}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  };
