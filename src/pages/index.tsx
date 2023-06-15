import styles from './index.less';
import { DatePicker } from 'antd';
import {
  Input,
  Form,
  Button,
  Space,
  Table,
  Tag,
  Popconfirm,
  Row,
  Col,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from '@ant-design/icons';
import { request } from 'umi';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
const stuGet = () => {
  return request('/classes/set', { method: 'GET' });
};
const stuDel = (id: any) => {
  //删除
  return request(`/classes/set?id=${id}`, { method: 'DELETE' });
};

const EditSvg = () => (
  <svg width="20" height="20" fill="#1296db" viewBox="0 0 1024 1024">
    <path
      d="M860 504c-19.9 0-36 16.1-36 36 0 1.4 0.1 2.7 0.2 4h-0.2v344H136V200h376c19.9 0 36-16.1 36-36s-16.1-36-36-36H136c-39.8 0-72 32.2-72 72v688c0 39.8 32.2 72 72 72h688c39.8 0 72-32.2 72-72V544h-0.2c0.1-1.3 0.2-2.6 0.2-4 0-19.9-16.1-36-36-36z"
      p-id="3944"
      fill="#1296db"
    ></path>
    <path
      d="M1002.7 100.3L923.4 21c-28.1-28.1-73.9-27.9-102 0.2L424.2 418.4c-2.9 2.9-5.2 6.4-6.8 10.2L317.6 664c-5.6 13.2-1.7 26.5 6.8 35.1 8.5 8.6 21.9 12.5 35.2 6.9l235.5-99.7c3.8-1.6 7.2-3.9 10.2-6.8l397.2-397.2c28.1-28.1 28.3-73.9 0.2-102zM559.8 543l-137.4 58.2 58.2-137.4L759.4 185l79.2 79.2L559.8 543z m391.7-391.7l-62 62-79.2-79.2 62-62 0.2-0.2 79.2 79.2-0.2 0.2z"
      p-id="3945"
    ></path>
  </svg>
);
const DeleteSvg = () => (
  <svg width="22" height="22" fill="#d81e06" viewBox="0 0 1024 1024">
    <path
      d="M768 384c-19.2 0-32 12.8-32 32l0 377.6c0 25.6-19.2 38.4-38.4 38.4L326.4 832c-25.6 0-38.4-19.2-38.4-38.4L288 416C288 396.8 275.2 384 256 384S224 396.8 224 416l0 377.6c0 57.6 44.8 102.4 102.4 102.4l364.8 0c57.6 0 102.4-44.8 102.4-102.4L793.6 416C800 396.8 787.2 384 768 384z"
      fill="#d81e06"
      p-id="5008"
    ></path>
    <path
      d="M460.8 736l0-320C460.8 396.8 448 384 435.2 384S396.8 396.8 396.8 416l0 320c0 19.2 12.8 32 32 32S460.8 755.2 460.8 736z"
      fill="#d81e06"
      p-id="5009"
    ></path>
    <path
      d="M627.2 736l0-320C627.2 396.8 608 384 588.8 384S563.2 396.8 563.2 416l0 320C563.2 755.2 576 768 588.8 768S627.2 755.2 627.2 736z"
      fill="#d81e06"
      p-id="5010"
    ></path>
    <path
      d="M832 256l-160 0L672 211.2C672 166.4 633.6 128 588.8 128L435.2 128C390.4 128 352 166.4 352 211.2L352 256 192 256C172.8 256 160 268.8 160 288S172.8 320 192 320l640 0c19.2 0 32-12.8 32-32S851.2 256 832 256zM416 211.2C416 198.4 422.4 192 435.2 192l153.6 0c12.8 0 19.2 6.4 19.2 19.2L608 256l-192 0L416 211.2z"
      p-id="5011"
    ></path>
  </svg>
);

export default function IndexPage() {
  interface DataType {
    key: string;
    code: number;
    name: string;
    apply: string;
    time: string;
    create_user: string;
    update_time: string;
    update_user: string;
  }

  const EditIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={EditSvg} {...props} />
  );
  const DeleteIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={DeleteSvg} {...props} />
  );
  type DataIndex = keyof DataType;
  let [dataSource, setDataSource] = useState<DataType[]>([]);
  let [searchText, setSearchText] = useState('');
  let [searchedColum, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(dataSource);
  // const applyList=useSelector(())
  useEffect(() => {
    // 发送 GET 请求
    stuGet().then((response) => {
        // 处理响应数据
        console.log(response.data);
        setDataSource(response.data);
      })
      .catch((error) => {
        // 处理错误
        console.error(error);
      });
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: '配置code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <a>{text}</a>,
      width: '8%',
      fixed: 'left',
      // sorter: true,
    },
    {
      title: '配置名称',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
    },
    {
      title: '所属应用',
      dataIndex: 'apply',
      key: 'apply',
      width: '10%',
    },
    {
      title: '创建时间',
      key: 'time',
      dataIndex: 'time',
      width: '10%',
    },
    {
      title: '创建人',
      key: 'create_user',
      dataIndex: 'create_user',
      width: '10%',
    },
    {
      title: '更新时间',
      key: 'update_time',
      dataIndex: 'update_time',
      width: '10%',
    },
    {
      title: '更新人',
      key: 'update_user',
      dataIndex: 'update_user',
      width: '10%',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: '10%',
    },
    {
      title: '操作',
      key: 'operator',
      render: (_, record: { key: React.Key }, index) => (
        <Space size="middle">
          <EditIcon />

          <Popconfirm
            title="配置删除后不可恢复，是否确认删除"
            onConfirm={() => handleDelete(record.key, index)}
          >
            <DeleteIcon />
          </Popconfirm>
        </Space>
      ),
      width: '10%',
    },
  ];

  const handleDelete = (key: React.Key, index: number) => {
    stuDel(key).then((res) => {
      console.log(res);
      // 重新set
      console.log(index);
      // dataSource.splice(index,1)
      // const newData = dataSource.filter((item) => item.key !== key);
      dataSource.splice(index, 1);
      // 响应式数组
      setDataSource([...dataSource]);
    });
  };
  const searchTextChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.target.value);
    console.log(ev.target.value);
    if (ev.target.value == '') {
      setDataSource(dataSource);
    }
  };
  const handleFilter = () => {
    const filteredResults = dataSource.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    setDataSource(filteredResults);
  };
  const handleButtonClick = () => {
    handleFilter();
  };
  return (
    <div>
      <div>
        <Form // 栅格化
          style={{ width: '1000px', margin: '20px' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Row>
            <Col>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 12 }}
                label="所属应用"
                name="userApply"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 12 }}
                label="配置名称"
                name="userName"
                className={styles.box2}
              >
                <Input value={searchText} onChange={searchTextChange} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item style={{ marginRight: '20px' }}>
                <Button
                  htmlType="button"
                  className="login-form-button"
                  type="primary"
                >
                  重置
                </Button>
                {/* Or <a href="">register now!</a> */}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item style={{ marginRight: '20px' }}>
                <Button
                  htmlType="button"
                  className="login-form-button"
                  type="primary"
                  onClick={handleButtonClick}
                >
                  搜索
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  htmlType="button"
                  className="login-form-button"
                  style={{ backgroundColor: '#00b96b', color: '#fff' }}
                >
                  新增
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          style={{ width: '1500px' }}
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 1500 }}
          pagination={{ pageSize: 5 }}
        />
        ;
      </div>
    </div>
  );
}
