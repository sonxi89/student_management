import {
  DeleteOutlined,
  RedoOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, Table, Tooltip, message, Drawer, Form, Input } from 'antd';
import DetailScore from '../../components/DetailScore';
import ScoreForm from '../../forms/ScoreForm/index,';
import React, { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import aixosClient from '../../api/aixosClient';

// const baseURL = 'http://localhost:8080/student/';
const { confirm } = Modal;

const ListScore = () => {
  const [dataUser, setDataUser] = useState([]);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [openDetailScore, setOpenDetailScore] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ page: 1 });

  useEffect(() => {
    fetchRecords(params);
  }, [params]);

  const fetchRecords = (params) => {
    setLoading(true);
    userApi
      .getScore(params)
      .then((res) => {
        setDataUser(res.data);
        setTotalPages(res.pagination.total);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteScore = async (itemId) => {
    // const url = baseURL + 'delete-score/' + itemId;
    try {
      await aixosClient.delete('/student/delete-score/' + itemId);
      fetchRecords(params);
      message.success('Xóa thành công!');
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteConfirm = (data) => {
    console.log(data);
    confirm({
      title: 'Bạn có muốn xóa bản ghi này?',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn chắc chắn muốn xóa ?',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deleteScore(data.id);
        setOpenFormEdit(false);
        setOpenDetailScore(false);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const updateDataAfterSave = () => {
    fetchRecords(params);
  };

  const onClose = () => {
    setOpenFormEdit(false);
    setOpenDetailScore(false);
  };

  const onFinish = (values) => {
    const newParams = { ...values, page: 1 };
    setParams(newParams);
    console.log(values);
  };

  const showScoreDetail = (data, action) => {
    setSelectedScore(data);

    if (action === 'view') {
      setOpenDetailScore(true);
      setOpenFormEdit(false);
    } else if (action === 'edit') {
      setOpenFormEdit(true);
      setOpenDetailScore(false);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  const columns = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'student_code',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'student_name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'student_dob',
    },
    {
      title: 'Lớp',
      dataIndex: 'class_name',
    },
    {
      title: 'Ngành',
      dataIndex: 'majors_name',
    },
    {
      title: 'Khoa',
      dataIndex: 'faculty_name',
    },
    {
      title: 'Năm học',
      dataIndex: 'year_code',
    },
    {
      title: 'Điểm học phần',
      dataIndex: 'course_score_hk',
    },
    {
      title: 'Điểm rèn luyện',
      dataIndex: 'conduct_score',
    },
    {
      title: '',
      render: (record) => (
        <Space wrap>
          <Tooltip color="#2db7f5" placement="top" title="Xem">
            <Button size="small" icon={<EyeOutlined />} onClick={() => showScoreDetail(record, 'view')} />
          </Tooltip>
          <Tooltip color="#87d068" placement="top" title="Sửa">
            <Button size="small" icon={<EditOutlined />} onClick={() => showScoreDetail(record, 'edit')} />
          </Tooltip>
          <Tooltip color="#f50" placement="top" title="Xóa">
            <Button size="small" icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record)} />
          </Tooltip>
        </Space>
      ),
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
        <h2>Danh sách điểm</h2>
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
      <Form
        name="validate_other"
        onFinish={onFinish}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Form.Item style={{ marginRight: '20px' }} name="search">
          <Input style={{ width: '450px' }} />
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
        dataSource={dataUser}
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
      <Drawer
        width={450}
        title={openDetailScore ? 'Score Detail' : 'Score Edit'}
        placement="left"
        onClose={onClose}
        open={openDetailScore || openFormEdit}
      >
        {openDetailScore && (
          <DetailScore data={selectedScore} showFormEdit={showScoreDetail} showDeleteConfirm={showDeleteConfirm} />
        )}
        {openFormEdit && <ScoreForm data={selectedScore} updateDataAfterSave={updateDataAfterSave} onClose={onClose} />}
      </Drawer>
    </>
  );
};

export default ListScore;
