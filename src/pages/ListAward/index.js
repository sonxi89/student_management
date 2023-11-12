import { DownloadOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import CommonUtils from '../../util/CommonUtils';

const { Option } = Select;

const ListAward = () => {
  const [dataAward, setDataAward] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ page: 1 });
  const [paramsExport, setParamsExport] = useState({});

  useEffect(() => {
    fetchRecords(params);
  }, [params]);

  const fetchRecords = (params) => {
    setLoading(true);
    userApi
      .getAward(params)
      .then((res) => {
        setDataAward(res.data);
        setTotalPages(res.pagination.total);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values) => {
    const newParams = { ...values, page: 1 };
    setParams(newParams);
    setParamsExport(values);
  };

  let handleExport = async () => {
    try {
      const res = await userApi.getAward(paramsExport);
      if (res) {
        const classParam = paramsExport.class ? `_${paramsExport.class}` : '';
        const yearParam = paramsExport.year ? `_${paramsExport.year}` : '';
        const typeParam = paramsExport.type ? `_${paramsExport.type}` : '';
        await CommonUtils.exportExcel(res.data, `awards${classParam}${yearParam}${typeParam}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'student_code',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'Student.student_name',
    },
    {
      title: 'Lớp',
      dataIndex: 'Student.class',
    },
    {
      title: 'Năm học',
      dataIndex: 'year_code',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'Student.student_position',
      render: (value) => (value == 1 ? <Tag color="green">Cán bộ lớp</Tag> : null),
    },
    {
      title: 'Ngành',
      dataIndex: 'Student.majors',
    },
    {
      title: 'Khoa',
      dataIndex: 'Student.faculty',
    },
    {
      title: 'Khen thưởng',
      dataIndex: 'award_type',
      render: (value) => {
        const tagColors = {
          SVG: '#2db7f5',
          SVXS: '#87d068',
          SVCĐG: '#108ee9',
          'SVXS, SVCĐG': '#f17950',
        };
        const color = tagColors[value];
        return <Tag color={color}>{value}</Tag>;
      },
    },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Danh sách khen thưởng</h2>
        <div>
          <Button icon={<RedoOutlined />}>Làm mới</Button>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => {
              handleExport();
            }}
          >
            Tải về
          </Button>
        </div>
      </div>
      <br />

      <Form
        name="validate_other"
        onFinish={onFinish}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Form.Item style={{ marginRight: '20px' }} name="class" label="Lớp">
          <Select defaultValue="">
            <Option value="">-- Lớp --</Option>
            <Option value="K64">K64</Option>
            <Option value="K63">K63</Option>
            <Option value="K62">K62</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginRight: '20px' }} name="year" label="Năm học">
          <Select defaultValue="">
            <Option value="">-- Năm học --</Option>
            <Option value="2021-2022">2021-2022</Option>
            <Option value="2022-2023">2022-2023</Option>
            <Option value="2023-2024">2023-2024</Option>
            <Option value="2024-2026">2024-2026</Option>
            <Option value="2026-2027">2026-2027</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginRight: '20px' }} name="type" label="Loại khen thưởng">
          <Select defaultValue="">
            <Option value="">-- Khen thưởng --</Option>
            <Option value="SVG">Sinh viên giỏi</Option>
            <Option value="SVXS">Sinh viên xuất sắc</Option>
            <Option value="SVCĐG">Sinh viên có đóng góp</Option>
            <Option value="SVG&SVCĐG">Sinh viên có đóng góp, XS</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginRight: '20px' }} name="majors" label="Ngành">
          <Select defaultValue="">
            <Option value="">-- Ngành học --</Option>
            <Option value="Kỹ thuật máy tính">Kỹ thuật máy tính</Option>
            <Option value="Kỹ thuật Robot">Kỹ thuật Robot</Option>
            <Option value="Hệ thống thông tin">Hệ thống thông tin</Option>
            <Option value="Mạng máy tính và Truyền thông dữ liệu">Mạng máy tính và Truyền thông dữ liệu</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginRight: '20px' }} name="faculty" label="Khoa">
          <Select defaultValue="">
            <Option value="">-- Khoa --</Option>
            <Option value="Khoa Công nghệ thông tin">Công nghệ thông tin</Option>
            <Option value="Khoa Điện tử viễn thông">Điện tử viễn thông</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginRight: '20px' }} name="search">
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              Tìm kiếm
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        loading={loading}
        dataSource={dataAward}
        rowKey="id"
        pagination={{
          pageSize: 10,
          total: totalPages,
          current: params.page,
          onChange: (page) => {
            setParams({ ...params, page });
          },
        }}
      />
    </>
  );
};

export default ListAward;
