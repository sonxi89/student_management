import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
const { confirm } = Modal;

const ListAward = () => {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userList = await userApi.getAll();
      setDataUser(userList);
    };
    fetchUser();
  }, []);

  const showDeleteConfirm = (data) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn chắc chắn muốn xóa ?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('Ok');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
      title: 'Năm học',
      dataIndex: 'Scores.year_code',
    },
    {
      title: 'Điểm học phần',
      dataIndex: 'Scores.course_score_hk',
    },
    {
      title: 'Điểm rèn luyện',
      dataIndex: 'Scores.conduct_score',
    },
    {
      title: 'Điểm D',
      dataIndex: 'Scores.score_d',
    },
    {
      title: 'Khen thưởng',
      dataIndex: 'Awards.award_type',
    },
    {
      title: '',
      render: () => (
        <Space wrap>
          <Tooltip color="#2db7f5" placement="top" title="Xem">
            <Button size="small" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip color="#87d068" placement="top" title="Sửa">
            <Button size="small" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip color="#f50" placement="top" title="Xóa">
            <Button size="small" icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUser} rowKey="Scores.id" />
    </>
  );
};

export default ListAward;
