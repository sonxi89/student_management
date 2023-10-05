import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, Tooltip, Modal, message, Drawer } from 'antd';
import userApi from '../../api/userApi';
import StudentForm from '../../forms/StudentForm';
import InfoStudent from '../../components/InfoStudent';
import { ExclamationCircleFilled, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;
const baseURL = 'http://localhost:8080/student/';

const ListStudent = () => {
  const [dataStudents, setDataStudents] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [openInfoStudent, setOpenInfoStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await userApi.getStudent();

      setDataStudents(data);
    };
    fetchUser();
  }, [isDeleted, openFormEdit]);

  const deleteStudent = async (itemId) => {
    const url = baseURL + itemId + '/delete';
    try {
      const response = await axios.delete(url);
      message.success(response.data);
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
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
      dataIndex: 'class_code',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'student_position',
      render: (value) => (value ? <Tag color="green">Cán bộ lớp</Tag> : null),
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
      <Table columns={columns} dataSource={dataStudents} rowKey="id" />
      <Drawer title={openInfoStudent ? 'Student Profile' : 'Student Edit'} placement="left" onClose={onClose} open={openInfoStudent || openFormEdit}>
        {openInfoStudent && <InfoStudent data={selectedStudent} showFormEdit={showStudentDetail} showDeleteConfirm={showDeleteConfirm} />}
        {openFormEdit && <StudentForm data={selectedStudent} onClose={onClose} />}
      </Drawer>
    </>
  );
};

export default ListStudent;
