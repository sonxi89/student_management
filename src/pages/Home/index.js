import Chart from '../../chart/Chart';
import SummaryCard from './components/SummaryCard';
import CardInfo from './components/CardInfo';

function Home() {
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
          tagColor="#dd8d74"
          icon="/img/education_1.png"
        />
        <SummaryCard
          title="Sinh viên xuất sắc"
          tagContent="Sinh viên giỏi"
          tagColor="#dd8d74"
          icon="/img/education_2.png"
        />
        <SummaryCard
          title="Sinh viên có đóng góp"
          tagContent="Sinh viên giỏi"
          tagColor="#dd8d74"
          icon="/img/education_3.png"
        />
        <SummaryCard
          title="Sinh XS và có ĐG"
          tagContent="Sinh viên giỏi"
          tagColor="#dd8d74"
          icon="/img/education_4.png"
        />
      </div>
      <Chart />
    </>
  );
}

export default Home;
