import React, { useState } from 'react';
import { Col, Row, Space, Button } from 'antd';
import './DetailScore.scss';

const DescriptionItem = ({ title, content }) => (
  <Row key={title} gutter={12}>
    <Col className="gutter-row" span={8}>
      <p>{title}</p>
    </Col>
    <Col className="gutter-row" span={2}>
      <p> : </p>
    </Col>
    <Col className="gutter-row" span={14}>
      <p>{content}</p>
    </Col>
  </Row>
);

function DetailScore({ data, showFormEdit, showDeleteConfirm }) {
  return (
    <>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Họ tên" content={data.student_name} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Mã sinh viên" content={data.student_code} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Ngày sinh" content={data.student_dob} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Lớp" content={data.class_name} />
        </Col>
        {data.student_position != null && (
          <Col span={24}>
            <DescriptionItem title="Chức vụ" content={data.student_position == 1 ? 'Cán bộ lớp' : null} />
          </Col>
        )}
        <Col span={24}>
          <DescriptionItem title="Năm học" content={data.year_code} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Điểm học phần" content={data.course_score_hk} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Điểm rèn luyện" content={data.conduct_score} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Ngành" content={data.majors_name} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Khoa" content={data.faculty_name} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Điểm dưới C+" content={data.score_below_C_plus} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Điểm F" content={data.score_fail} />
        </Col>
      </Row>

      <Space wrap style={{ marginTop: '30px' }}>
        <Button onClick={() => showFormEdit(data, 'edit')} type="primary">
          Sửa
        </Button>
        <Button onClick={() => showDeleteConfirm(data)} danger>
          Xóa
        </Button>
      </Space>
    </>
  );
}

export default DetailScore;
