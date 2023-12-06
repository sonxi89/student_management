import Chart from '../../chart/Chart';
import SummaryCard from './components/SummaryCard';
import React, { useEffect, useState } from 'react';
import userApi from '../../api/userApi';

const Home = () => {
  const [dataReport, setDataReport] = useState();
  const [dataReportDiagram, setDataReportDiagram] = useState();

  useEffect(() => {
    userApi
      .getReport()
      .then((res) => {
        setDataReport(res);
        setDataReportDiagram([
          { name: 'SVG', value: res.svg },
          { name: 'SVXS', value: res.svxs },
          { name: 'SVCĐG', value: res.svcdg },
          { name: 'SVXS & SVCĐG', value: res.svxsvcdg },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Tổng quan</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <SummaryCard
          title="Sinh viên giỏi"
          tagContent="Sinh viên giỏi"
          tagColor="#87d174"
          data={dataReport?.svg}
          icon="/img/education_1.png"
        />
        <SummaryCard
          title="Sinh viên xuất sắc"
          tagContent="Sinh viên xuất sắc"
          tagColor="#87d174"
          data={dataReport?.svxs}
          icon="/img/education_2.png"
        />
        <SummaryCard
          title="Sinh viên có đóng góp"
          tagContent="Sinh viên có đóng góp"
          tagColor="#87d174"
          data={dataReport?.svcdg}
          icon="/img/education_3.png"
        />
        <SummaryCard
          title="Sinh XS và có ĐG"
          tagContent="Sinh viên XS và CĐG"
          tagColor="#87d174"
          data={dataReport?.svxsvcdg}
          icon="/img/education_4.png"
        />
      </div>
      <Chart data1={dataReportDiagram} />
    </>
  );
};

export default Home;
