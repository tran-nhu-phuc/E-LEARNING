import { Button } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./modalEdit.css";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { MdAddPhotoAlternate } from "react-icons/md";
import { update } from "../../store/reducers/update";
import { ToastError, ToastSuccess } from "../../common/toastify.common";
import CourseService from "../../services/course.service";
import { IntfCourse } from "../../types/interface";
interface Props {
  offModalEdit: Function;
  dataEdit: any;
}
const ModalEdit = (props: Props) => {
  const [updateCourse, setUpdateCourse] = useState<IntfCourse>(props.dataEdit);
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>(props.dataEdit.image);
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateCourse({
      ...updateCourse,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateCourse({
      ...updateCourse,
      [e.target.name]: e.target.value,
    });
  };
  const handleImage = (e: any) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleUpdateCourse = async (id: number) => {
    try {
      const courseService = new CourseService();
      await courseService.editCourse(id, {
        ...updateCourse,
        image,
      });
      dispatch(update());
      props.offModalEdit();
      ToastSuccess("Update course successful");
    } catch (error: any) {
      ToastError("Update course failed");
    }
  };

  return (
    <div className="modalEditOverlay">
      <div className="modalEdit">
        <div className="modalEditImg">
          <img
            src={
              image ||
              "https://as1.ftcdn.net/v2/jpg/00/99/63/86/1000_F_99638655_RNePZuhfOSOjRZvnZMJKsjmmpRoO04YI.jpg"
            }
            alt=""
          />
          <div className="selectFile">
            <label htmlFor="photo">
              <MdAddPhotoAlternate />
            </label>
            <input onChange={handleImage} type="file" name="img" id="photo" />
          </div>
        </div>
        <div className="modalEditInputs">
          <div className="modalEditInput">
            <input
              onChange={handleChangeInput}
              value={updateCourse.courseName}
              placeholder="Course Name"
              type="text"
              name="courseName"
              id=""
            />
          </div>
          <div className="modalEditInput">
            <input
              onChange={handleChangeInput}
              value={updateCourse.description}
              placeholder="Describe"
              type="text"
              name="description"
              id=""
            />
          </div>
          <div className="modalEditInput">
            <input
              onChange={handleChangeInput}
              value={updateCourse.completedContent}
              placeholder="content"
              type="text"
              name="completedContent"
              id=""
            />
          </div>
          <div className="modalEditInput">
            <input
              onChange={handleChangeInput}
              value={updateCourse.price}
              placeholder="Price"
              type="text"
              name="price"
              id=""
            />
          </div>
          <div className="modalEditInput">
            <select onChange={handleChangeSelect} name="level" id="">
              <option value="0">{updateCourse.level}</option>
              <option value="1">1.Cơ bản</option>
              <option value="2">2.Trung Bình</option>
              <option value="3">3.Nâng cao</option>
            </select>
          </div>
          <div className="modalEditInput">
            <select onChange={handleChangeSelect} name="category" id="">
              <option value="0">{updateCourse.categoryId}</option>
              <option value="1">1.FrontEnd</option>
              <option value="2">2.BackEnd</option>
              <option value="3">3.DataBase</option>
            </select>
          </div>
        </div>
        <div className="modalEditActions">
          <Button
            onClick={() => handleUpdateCourse(props.dataEdit.id)}
            type="primary"
          >
            EDIT
          </Button>
          <Button onClick={() => props.offModalEdit()} type="primary">
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
