import React, { ChangeEvent } from "react";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import "./rate.css";
import { GoDotFill } from "react-icons/go";
import { BsDashLg } from "react-icons/bs";
import { RateService } from "../../services/rates.service";
const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
interface Props {
    course: any,
    offIsRate:Function
}
const Rates = (props:Props): JSX.Element => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const [rate, setRate] = React.useState<number>(4);
  const rateService = new RateService();
  const changeRateStar = (e: number) => {
    setRate(e);
  };
  const handleCreateRate = async () => {
    if (rate === 0) {
    } else {
      await rateService.createRate(user.id, Number(props.course?.courseId), rate);
      setRate(4);
      alert("Rate Success!");
      props.offIsRate();
    }
  };
  return (
    <section className="rate_overlay">
      <div className="rates">
        <img
          className="rate_unFlip"
          src="../../../wired-gradient-1103-confetti.apng"
          alt=""
        />
        <img
          className="rate_flip"
          src="../../../wired-gradient-1103-confetti.apng"
          alt=""
        />
        <div className="rates_title">
          <h1>CHÚC MỪNG</h1>
          <p>Bạn đã hoàn thành khóa học</p>
          <p style={{ fontWeight: 600 }}>{props.course?.course.courseName}</p>
        </div>
        <div className="rates_hr">
          <GoDotFill className="rate_dot dot_left" />
          <div className="rate_hr_line">
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
            <BsDashLg />
          </div>
          <GoDotFill className="rate_dot dot_right" />
        </div>
        <div className="rates_action">
          <p>Trải nghiệm của bạn với khóa học như thế nào?</p>
          <Rate
            onChange={changeRateStar}
            className="rate_emotion"
            defaultValue={4}
            value={rate}
            character={({ index = 0 }) => customIcons[index + 1]}
          />
          <button onClick={handleCreateRate}>Submit</button>
        </div>
        <div className="rate_action_sup">
          <p>
            Đánh giá của bạn sẽ giúp chúng tôi cải thiện lên từng ngày để mang
            đến những khóa học chất lượng đến mọi học viên
          </p>
        </div>
      </div>
    </section>
  );
};

export default Rates;
