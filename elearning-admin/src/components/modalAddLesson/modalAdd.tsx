import { Button, Popconfirm } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./modalAdd.css";
import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import { ToastSuccess, ToastWarning } from "../../common/toastify.common";
import LessonService from "../../services/lesson.service";
interface Props {
  offModalLessonAdd: Function;
  courseId?: any;
}
const ModalAddLesson = (props: Props) => {
  const [newLesson, setNewLesson] = useState({
    courseId: props.courseId,
    title: "",
    position: "",
    duration: "",
    videoURL: "",
  });

  const handleBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
    const spanElements = e.target.parentElement?.querySelector(
      ".ruleBlur"
    ) as HTMLSpanElement;
    if (e.target.value === "" || e.target.value === "0") {
      e.target.style.border = "1px solid red";
      spanElements.innerText = "Enter this field*";
    } else {
      e.target.style.border = "1px solid #000";
      spanElements.innerText = "";
    }
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLesson({
      ...newLesson,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setNewLesson({
      ...newLesson,
      courseId: props.courseId,
    });
  }, [props.courseId]);

  const lessonService = new LessonService();
  const dispatch = useDispatch();
  const handleAddNewLesson = async () => {
    if (
      newLesson.title === "" ||
      newLesson.videoURL === "" ||
      newLesson.duration === "" ||
      newLesson.position === ""
    ) {
      ToastWarning("Please enter all fields");
    } else {
      const result = await lessonService.addLesson(newLesson);
      if (result === 2) {
        ToastWarning("Lesson creation failed");
      } else {
        props.offModalLessonAdd();
        dispatch(update());
        ToastSuccess("Lesson created successfully");
      }
    }
  };

  return (
    <div className="modalAddOverlay">
      <div className="modalAdd">
        <div className="modalAddInputs">
          <div className="modalAddInput">
            <input
              onChange={changeInput}
              value={newLesson.title}
              onBlur={handleBlurInput}
              placeholder="Title"
              type="text"
              name="title"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddInput">
            <input
              onChange={changeInput}
              value={newLesson.duration}
              onBlur={handleBlurInput}
              placeholder="Duration"
              type="text"
              name="duration"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddInput">
            <input
              onChange={changeInput}
              value={newLesson.position}
              onBlur={handleBlurInput}
              placeholder="Position"
              type="text"
              name="position"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddInput">
            <input
              onChange={changeInput}
              value={newLesson.videoURL}
              onBlur={handleBlurInput}
              placeholder="videoURL"
              type="text"
              name="videoURL"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
        </div>
        <div className="modalAddActions">
          <Button onClick={handleAddNewLesson} type="primary">
            ADD
          </Button>
          <Button onClick={() => props.offModalLessonAdd()} type="primary">
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddLesson;
