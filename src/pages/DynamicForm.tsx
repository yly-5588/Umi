import { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

let data = [
  { value: 'text', label: '文本' },
  { value: 'number', label: '数字' },
  { value: 'boolean', label: '布尔' },
  { value: 'dataTime', label: '时间戳' },
];
const textAndNumber = [
  { value: 'text', label: '文本框' },
  { value: 'radio', label: '单选框' },
];
const dataTime = [{ value: 'dataTime', label: '时间控件' }];

const boolean = [{ value: 'radio', label: '单选框' }];

const { Option } = Select;

const DynamicForm = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState<any>(data);
  const [input, setInput] = useState<any>([]);
  const [inputVisible, setInputVisible] = useState(false); // 输入框可见性状态

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const handleChange = (val: string) => {
    form.setFieldValue('inputName', '');
    if (val === 'text' || val === 'number') {
      setInput(textAndNumber);
      setInputVisible(false); // 设置输入框可见
    } else if (val === 'boolean') {
      form.setFieldValue('inputName', 'radio');
      setInput(boolean);
      setInputVisible(true); // 设置输入框可见
    } else if (val === 'dataTime') {
      form.setFieldValue('inputName', 'dataTime');
      setInput(dataTime);
      setInputVisible(false); // 设置输入框可见
    }
  };
  const inputHandleChange = (val: string) => {
    console.log(form.getFieldValue('inputName'));
    console.log(val);
    if (val === 'radio') {
      setInputVisible(true); // 设置输入框可见
    } else {
      setInputVisible(false); // 设置输入框不可见
    }
  };
  return (
    <Form form={form} {...layout}>
      <Form.Item name="name" label="字段名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="alias" label="字段别名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="typeName" label="字段类型" rules={[{ required: true }]}>
        <Select
          placeholder="请选择字段类型"
          options={type}
          // fieldNames={{ label: 'typeName', value: 'key' }}
          onChange={handleChange}
          allowClear
        ></Select>
      </Form.Item>
      {input && input.length > 0 && (
        <Form.Item
          name="inputName"
          label="录入方式"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="请选择录入方式"
            options={input}
            onChange={inputHandleChange}
            allowClear
          ></Select>
        </Form.Item>
      )}

      {inputVisible && (
        <Form.Item name="eum" label="枚举值" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      )}

      <Form.Item
        name="empyty"
        label="是否允许为空"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="default" label="默认值">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
