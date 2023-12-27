import React, { useEffect, useState } from 'react';
import { DownloadOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { Table, Form, Select, Space, Button } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import userApi from '../../api/userApi';

const { Option } = Select;

function Statistics() {
  const [data, setData] = useState();
  const [params, setParams] = useState({});
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchRecords(params);
  }, [params]);

  const fetchRecords = (params) => {
    userApi
      .getStatistics(params)
      .then((res) => {
        setData(res);
        setIsActive(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExport = () => {
    const excel = new Excel();
    excel
      .addSheet('Thống kê')
      .addColumns(columns)
      .addDataSource(data, {
        str2Percent: true,
      })
      .saveAs('Excel.xlsx');
  };

  const onFinish = (values) => {
    console.log(values);
    setParams(values);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const columns = [
    {
      title: 'SVG',
      dataIndex: 'svg',
      key: 'svg',
      fixed: 'left',
      width: 80,
    },
    {
      title: 'SVXS',
      dataIndex: 'svxs',
      key: 'svxs',
      fixed: 'left',
      width: 80,
    },
    {
      title: 'SVCĐG',
      dataIndex: 'svcdg',
      key: 'svcdg',
      fixed: 'left',
      width: 80,
    },
    {
      title: 'Khoa CNTT',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_cntt',
          key: 'svg_cntt',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_cntt',
          key: 'svxs_cntt',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_cntt',
          key: 'svcdg_cntt',
          width: 80,
        },
      ],
    },
    {
      title: 'Khoa ĐTVT',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_dtvt',
          key: 'svg_dtvt',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_dtvt',
          key: 'svxs_dtvt',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_dtvt',
          key: 'svcdg_dtvt',
          width: 80,
        },
      ],
    },
    {
      title: 'Khoa VLKT&CNN',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_vlkt',
          key: 'svg_vlkt',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_vlkt',
          key: 'svxs_vlkt',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_vlkt',
          key: 'svcdg_vlkt',
          width: 80,
        },
      ],
    },
    {
      title: 'Khoa CHKT&TĐH',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_chkt',
          key: 'svg_chkt',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_chkt',
          key: 'svxs_chkt',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_chkt',
          key: 'svcdg_chkt',
          width: 80,
        },
      ],
    },
    {
      title: 'Khoa CNNN',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_cnnn',
          key: 'svg_cnnn',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_cnnn',
          key: 'svxs_cnnn',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_cnnn',
          key: 'svcdg_cnnn',
          width: 80,
        },
      ],
    },
    {
      title: 'Khoa CNXD&GT',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_cnxd',
          key: 'svg_cnxd',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_cnxd',
          key: 'svxs_cnxd',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_cnxd',
          key: 'svcdg_cnxd',
          width: 80,
        },
      ],
    },
    {
      title: 'Viện CNHKVT',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_cnhkvt',
          key: 'svg_cnhkvt',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_cnhkvt',
          key: 'svxs_cnhkvt',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_cnhkvt',
          key: 'svcdg_cnhkvt',
          width: 80,
        },
      ],
    },
    {
      title: 'Viện TTVKT&CN',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_ttvkt',
          key: 'svg_ttnt',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_ttvkt',
          key: 'svxs_ttnt',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_ttvkt',
          key: 'svcdg_ttnt',
          width: 80,
        },
      ],
    },
    {
      title: 'Viện TTNT',
      children: [
        {
          title: 'SVG',
          dataIndex: 'svg_ttnt',
          key: 'svg_ttnt',
          width: 80,
        },
        {
          title: 'SVXS',
          dataIndex: 'svxs_ttnt',
          key: 'svxs_ttnt',
          width: 80,
        },
        {
          title: 'SVCĐG',
          dataIndex: 'svcdg_ttnt',
          key: 'svcdg_ttnt',
          width: 80,
        },
      ],
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
        <h2>Thống kê</h2>
        <div>
          <Button
            onClick={() => {
              handleReload();
            }}
            icon={<RedoOutlined />}
          >
            Làm mới
          </Button>
        </div>
      </div>
      <br />
      <Form
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        onFinish={onFinish}
      >
        <Form.Item style={{ marginRight: '20px', width: '70%' }} name="year" label="Năm học">
          <Select defaultValue="">
            <Option value="">-- Năm học --</Option>
            <Option value="2021-2022">2021-2022</Option>
            <Option value="2022-2023">2022-2023</Option>
            <Option value="2023-2024">2023-2024</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button style={{ backgroundColor: '#12bb7b' }} type="primary" icon={<SearchOutlined />} htmlType="submit">
              Tìm kiếm
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{
          x: 'calc(1200px + 50%)',
          y: 240,
        }}
      />
      <Button
        style={{ marginLeft: '10px' }}
        type="primary"
        disabled={isActive}
        icon={<DownloadOutlined />}
        onClick={() => {
          handleExport();
        }}
      >
        Tải về
      </Button>
    </>
  );
}

export default Statistics;
