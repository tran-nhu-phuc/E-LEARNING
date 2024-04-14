import { Button, Popconfirm } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./modalAdd.css";
import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import LessonService from "../../services/course.service";
import { ToastSuccess, ToastWarning } from "../../common/toastify.common";
import CourseService from "../../services/course.service";
interface Props {
  offModalAdd: Function;
}
const ModalAdd = (props: Props) => {
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    price: "",
    description: "",
    completedContent: "",
    level: "",
    categoryId: "",
    image: "",
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
  const [image, setImage] = useState<any>();
  const [fileUpdate, setFile] = useState<any>();
  const handleImage = (e: any) => {
    let file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
    setFile(file);
  };
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewCourse({
      ...newCourse,
      categoryId: e.target.value,
      level: e.target.value,
    });
  };
  const courseService = new CourseService();
  const dispatch = useDispatch();
  const handleAddNewCourse = async () => {
    if (
      newCourse.categoryId === "" ||
      newCourse.completedContent === "" ||
      newCourse.courseName === "" ||
      newCourse.price === "" ||
      newCourse.level === "" ||
      newCourse.description === ""
    ) {
      ToastWarning("Please enter all field");
    } else {
      const formData = new FormData();
      formData.append("courseName", newCourse.courseName);
      formData.append("description", newCourse.description);
      formData.append("completedContent", newCourse.completedContent);
      formData.append("price", newCourse.price);
      formData.append("categoryId", newCourse.categoryId);
      formData.append("level", newCourse.level);
      formData.append("image", fileUpdate);
      const result = await courseService.addCourse(formData);
      if (result === 2) {
        ToastWarning("Course create failed");
      } else {
        props.offModalAdd();
        dispatch(update());
        ToastSuccess("Course create successfully");
      }
    }
  };

  return (
    <div className="modalAddOverlay">
      <div className="modalAdd">
        <div className="modalAddImg">
          <img
            src={
              image?.preview
                ? image.preview
                : "https://as1.ftcdn.net/v2/jpg/00/99/63/86/1000_F_99638655_RNePZuhfOSOjRZvnZMJKsjmmpRoO04YI.jpg"
            }
            alt=""
          />
          <div className="selectFile">
            <label htmlFor="photo">
              <MdAddPhotoAlternate />
            </label>
            <input
              onChange={handleImage}
              style={{ display: "none" }}
              type="file"
              name="img"
              id="photo"
            />
          </div>
        </div>
        <div className="modalAddInputs">
          <div className="modalAddInput">
            <input
              onChange={changeInput}
              value={newCourse.courseName}
              onBlur={handleBlurInput}
              placeholder="Course Name"
              type="text"
              name="courseName"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddInput">
            <input
              onChange={changeInput}
              value={newCourse.description}
              onBlur={handleBlurInput}
              placeholder="Describe"
              type="text"
              name="description"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddInput">
            <input
              onChange={changeInput}
              value={newCourse.completedContent}
              onBlur={handleBlurInput}
              placeholder="content"
              type="text"
              name="completedContent"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddInput">
            <input
              onChange={changeInput}
              value={newCourse.price}
              onBlur={handleBlurInput}
              placeholder="Price"
              type="text"
              name="price"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddInput">
            <select onChange={handleChangeSelect} name="level" id="">
              <option value="0">--Level--</option>
              <option value="1">1.Cơ bản</option>
              <option value="2">2.Trung Bình</option>
              <option value="3">3.Nâng cao</option>
            </select>
          </div>
          <div className="modalAddInput">
            <select onChange={handleChangeSelect} name="category" id="">
              <option value="0">--Category--</option>
              <option value="1">1.FrontEnd</option>
              <option value="2">2.BackEnd</option>
              <option value="3">3.DataBase</option>
            </select>
          </div>
        </div>
        <div className="modalAddActions">
          {/* <Popconfirm
            title="Update "
            description="Are you sure about this information?"
            onConfirm={handleAddNewCourse}
            okText="Yes"
            cancelText="No"
          >
          </Popconfirm> */}
          <Button onClick={handleAddNewCourse} type="primary">
            ADD
          </Button>
          <Button onClick={() => props.offModalAdd()} type="primary">
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
