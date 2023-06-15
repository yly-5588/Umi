import { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

let data = [
  { key: 1, typeName: '文本' },
  { key: 2, typeName: '数字' },
  { key: 3, typeName: '布尔' },
  { key: 4, typeName: '时间戳' },
];

let data1 = [
  { key: 1, inputName: '文本框' },
  { key: 2, inputName: '单选框' },
];

let data2 = [{ key: 2, inputName: '单选框' }];
let data3 = [{ key: 3, inputName: '时间控件' }];

let data4 = [
  { key: 1, inputName: '文本框' },
  { key: 2, inputName: '单选框' },
  { key: 3, inputName: '时间控件' },
];

const { Option } = Select;

const DynamicForm1 = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState<{ value: string }[]>([]);
  const [input, setInput] = useState<{ value: string }[]>([]);
  const [titleTypeValue, setTitleTypeValue] = useState<string>(''); //字段类型
  
  const handleTitleTypeChange = (value: string) => {
    setTitleTypeValue(value);
    form.getFieldValue('importType');
    console.log(form.getFieldValue('importType'));

    form.setFieldValue('importType', ' ');
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  useEffect(() => {
    const inputType = data.map((c) => {
      return {
        value: c.typeName,
      };
    });
    setType(inputType);

    const timer = setTimeout(() => {}, 2);
    return function clear() {
      clearTimeout(timer);
    };
  }, []);

  return (
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
        <Form.Item label="枚举" name="enum" initialValue={'是-true,否-false'}>
          <Input />
        </Form.Item>
      )}

      <Form.Item name="title" label="是否允许为空">
        <Input type="textarea" />
      </Form.Item>

      <Form.Item name="title" label="默认值">
        <Input type="textarea" />
      </Form.Item>
    </Form>
  );
};

export default DynamicForm1;
