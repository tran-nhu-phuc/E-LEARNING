import React, { useEffect, useState } from "react";
import "./courseInfo.css";
import { Button, Flex } from "antd";

const CourseInfoText = ({ text }: { text: string }) => {
  const [isReadMore, setIsReadMore] = useState<Boolean>(false);
  return (
    <div className="admin_course_info_container">
      <p className={!isReadMore ? "course_info_text_wrap" : "course_info"}>
        {text}
      </p>
      <Flex gap="small" wrap="wrap">
        <Button
          type="dashed"
          onClick={() => {
            setIsReadMore(!isReadMore);
          }}
        >
          {!isReadMore ? "See more" : "Close"}
        </Button>
      </Flex>
    </div>
  );
};
export default CourseInfoText;
