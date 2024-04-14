import { Button } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./modalEdit.css";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import { ToastError, ToastSuccess } from "../../common/toastify.common";
import { IntfLesson } from "../../types/interface";
import LessonService from "../../services/lesson.service";
interface Props {
  offModalLessonEdit: Function;
  dataEditLesson: any;
}
const ModalEditLesson = (props: Props) => {
  const [updateLesson, setUpdateLesson] = useState<IntfLesson>(
    props.dataEditLesson
  );
  const dispatch = useDispatch();
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateLesson({
      ...updateLesson,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateLesson = async (id: number) => {
    try {
      const lessonService = new LessonService();
      await lessonService.updateLesson(id, {
        ...updateLesson,
      });
      dispatch(update());
      props.offModalLessonEdit();
      ToastSuccess("Update lesson successful");
    } catch (error: any) {
      ToastError("Update lesson failed");
    }
  };

  return (
    <div className="modalEditOverlay">
      <div className="modalEdit">
        <div className="modalEditInputs">
          <div className="modalEditInput">
            <input
              onChange={changeInput}
              value={updateLesson.title}
              placeholder="Title"
              type="text"
              name="title"
              id=""
            />
          </div>
          <div className="modalEditInput">
            <input
              onChange={changeInput}
              value={updateLesson.duration}
              placeholder="Duration"
              type="text"
              name="duration"
              id=""
            />
          </div>
          <div className="modalEditInput">
            <input
              onChange={changeInput}
              value={updateLesson.position}
              placeholder="Position"
              type="text"
              name="position"
              id=""
            />
          </div>
          <div className="modalEditInput">
            <input
              onChange={changeInput}
              value={updateLesson.videoURL}
              placeholder="videoURL"
              type="text"
              name="videoURL"
              id=""
            />
          </div>
        </div>
        <div className="modalEditActions">
          <Button
            onClick={() => handleUpdateLesson(props.dataEditLesson.id)}
            type="primary"
          >
            EDIT
          </Button>
          <Button onClick={() => props.offModalLessonEdit()} type="primary">
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditLesson;
