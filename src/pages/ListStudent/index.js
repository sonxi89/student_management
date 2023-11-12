import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, Tooltip, Modal, message, Drawer, Spin } from 'antd';
import userApi from '../../api/userApi';
import StudentForm from '../../forms/StudentForm';
import InfoStudent from '../../components/InfoStudent';
import { ExclamationCircleFilled, RedoOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;
const baseURL = 'http://localhost:8080/student/';

const ListStudent = () => {
  const [dataStudents, setDataStudents] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [openInfoStudent, setOpenInfoStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords(1);
  }, [isDeleted, openFormEdit]);

  const deleteStudent = async (itemId) => {
    const url = baseURL + itemId + '/delete';
    try {
      const response = await axios.delete(url);
      message.success(response.data);
      setIsDeleted(!isDeleted);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecords = (page) => {
    setLoading(true);
    userApi
      .getStudent(page)
      .then((res) => {
        setDataStudents(res.data);
        setTotalPages(res.pagination.total);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showDeleteConfirm = (itemId) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn chắc chắn muốn xóa ?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteStudent(itemId);
        setOpenFormEdit(false);
        setOpenInfoStudent(false);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClose = () => {
    setOpenFormEdit(false);
    setOpenInfoStudent(false);
  };

  const showStudentDetail = (data, action) => {
    setSelectedStudent(data);

    if (action === 'view') {
      setOpenInfoStudent(true);
      setOpenFormEdit(false);
    } else if (action === 'edit') {
      setOpenFormEdit(true);
      setOpenInfoStudent(false);
    }
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
      dataIndex: 'class',
    },
    {
      title: 'Ngành',
      dataIndex: 'majors',
    },
    {
      title: 'Khoa',
      dataIndex: 'faculty',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'student_position',
      render: (value) => (value == 1 ? <Tag color="green">Cán bộ lớp</Tag> : null),
    },
    {
      title: '',
      render: (record) => (
        <Space wrap>
          <Tooltip color="#2db7f5" placement="top" title="Xem">
            <Button size="small" icon={<EyeOutlined />} onClick={() => showStudentDetail(record, 'view')} />
          </Tooltip>
          <Tooltip color="#87d068" placement="top" title="Sửa">
            <Button size="small" icon={<EditOutlined />} onClick={() => showStudentDetail(record, 'edit')} />
          </Tooltip>
          <Tooltip color="#f50" placement="top" title="Xóa">
            <Button size="small" icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.id)} />
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
          <Button icon={<RedoOutlined />}>Làm mới</Button>
        </div>
      </div>
      <Table
        columns={columns}
        loading={loading}
        dataSource={dataStudents}
        rowKey="id"
        pagination={{
          pageSize: 10,
          total: totalPages,
          onChange: (page) => {
            fetchRecords(page);
          },
        }}
      />
      <Drawer
        title={openInfoStudent ? 'Student Profile' : 'Student Edit'}
        placement="left"
        onClose={onClose}
        open={openInfoStudent || openFormEdit}
      >
        {openInfoStudent && (
          <InfoStudent data={selectedStudent} showFormEdit={showStudentDetail} showDeleteConfirm={showDeleteConfirm} />
        )}
        {openFormEdit && <StudentForm data={selectedStudent} onClose={onClose} />}
      </Drawer>
    </>
  );
};

export default ListStudent;
