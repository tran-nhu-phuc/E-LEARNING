import React, { ChangeEvent, useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Popconfirm, Table } from "antd";
import "./adminCourse.css";
import { IntfCourse, IntfLesson } from "../../types/interface";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import formatPrice from "../../common/formatPrice.common";
import CourseService from "../../services/course.service";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import LessonService from "../../services/lesson.service";
import ModalAdd from "../modalAddCourse/modalAdd";
import ModalEdit from "../modalEditCourse/modalEdit";
import { update } from "../../store/reducers/update";
import CourseInfo from "../courseTextDesc/courseInfo";
import ModalEditLesson from "../modalEditLesson/modalEdit";
import ModalAddLesson from "../modalAddLesson/modalAdd";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const AdminCourse: React.FC = () => {
  const courseService = new CourseService();
  const lessonService = new LessonService();
  const [courses, setCourse] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalEditLesson, setModalEditLesson] = useState<boolean>(false);
  const [modalAddLesson, setModalAddLesson] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IntfCourse>();
  const [dataEditLesson, setDataEditLesson] = useState<IntfLesson>();
  const [courseId, setCourseId] = useState<number>();
  const [FreeCourse, setFreeCourse] = useState<boolean>(false);
  const [expandedLessons, setExpandedLessons] = useState<any[]>([]);
  const [imageForEdit, setImageForEdit] = useState<any>();
  const updateStatus = useSelector((state: any) => state.update);
  const [expandedDescription, setExpandedDescription] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const getCourse = async () => {
    const result = await courseService.getAllCourses();
    setCourse(result);
  };
  const getLesson = async () => {
    const result = await lessonService.getAllLessons();
    setLessons(result);
  };
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IntfCourse>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setCourse([]);
    }
  };
  const handleGetDataEdit = (record: IntfCourse) => {
    setDataEdit(record);
  };
  const handleGetDataEditLesson = (lesson: IntfLesson) => {
    setDataEditLesson(lesson);
  };

  const offModalEdit = () => {
    setModalEdit(false);
  };
  const offModalAdd = () => {
    setModalAdd(false);
  };
  const offModalEditLesson = () => {
    setModalEditLesson(false);
  };
  const offModalAddLesson = () => {
    setModalAddLesson(false);
  };
  const columns: TableColumnsType<IntfCourse> = [
    {
      key: "courseName",
      title: "Name",
      dataIndex: "courseName",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "Category",
      title: "Category",
      dataIndex: "categoryId",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "image",
      title: "Image",
      dataIndex: "image",
      render: (dataIndex, record: any) => (
        <img
          style={
            record.isDelete === 1
              ? {
                  height: "135px",
                  width: "135px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }
              : {
                  borderRadius: "10px",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  opacity: 0.3,
                }
          }
          src={dataIndex}
          alt="ảnh chương trình học"
        />
      ),
      width: "10%",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (dataIndex, record: any) => (
        <>
          {dataIndex.length > 30 ? <CourseInfo text={dataIndex} /> : dataIndex}
        </>
      ),
    },
    {
      key: "completedContent",
      title: "Completed Content",
      dataIndex: "completedContent",
      render: (dataIndex, record: any) => (
        <>
          {dataIndex.length > 30 ? <CourseInfo text={dataIndex} /> : dataIndex}
        </>
      ),
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (dataIndex, record: any) => (
        <p
          style={
            record.isDelete === 2
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {formatPrice(dataIndex)}
        </p>
      ),
      width: "15%",
      sorter: (a: any, b: any) => Number(a.price) - Number(b.price),
    },
    {
      key: "key",
      title: "Action",
      dataIndex: "",
      render: (dataIndex: number, record: any) => (
        <div className="course_action_button">
          <button onClick={() => handleDeleteCourse(record.id)}>Delete</button>
          <button
            onClick={() => {
              handleGetDataEdit(record);
              setModalEdit(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setCourseId(Number(record.id));
              setModalAddLesson(true);
            }}
          >
            Add Lesson
          </button>
        </div>
      ),
    },
  ];
  const fetchData = async () => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: courses.length,
      },
    });
  };

  const handleDeleteCourse = async (id: number) => {
    await courseService.deleteCourse(id);
    dispatch(update());
  };
  const handleDeleteLesson = async (id: number) => {
    await lessonService.deleteLesson(id);
    dispatch(update());
  };
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (newValue !== "") {
      const searchString = newValue.toLowerCase();
      const coursesAfterFilter = courses.filter((course) =>
        course.courseName.toLowerCase().includes(searchString)
      );
      setCourse(coursesAfterFilter);
    } else {
      getCourse();
    }
  };
  const handleShowCourse = () => {
    setFreeCourse(!FreeCourse);
  };

  useEffect(() => {
    fetchData();
    getCourse();
    getLesson();
  }, [JSON.stringify(tableParams), updateStatus]);
  const filterLessonsByCourseId = (courseId: string) => {
    return lessons.filter((lesson) => lesson.courseId === courseId);
  };
  const handleRowExpand = async (expanded: boolean, record: any) => {
    if (expanded) {
      const lessonsForExpandedCourse = filterLessonsByCourseId(record.id);
      setExpandedLessons(lessonsForExpandedCourse);
    } else {
      setExpandedLessons([]);
    }
  };
  const renderExpandedRow = (record: any) => {
    const lessonsForCurrentCourse = lessons.filter(
      (lesson) => lesson.courseId === Number(record.id)
    );
    return (
      <Table
        columns={[
          { title: "Title", dataIndex: "title", key: "title" },
          {
            title: "Position",
            dataIndex: "position",
            key: "position",
          },
          {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
          },
          {
            title: "Video Url",
            dataIndex: "videoURL",
            key: "videoURL",
            render: (videoUrl: string) => <a href={videoUrl}>{videoUrl}</a>,
          },
          {
            key: "key",
            title: "Action",
            dataIndex: "",
            render: (_, lesson: any) => (
              <div className="admin_lesson_action_button">
                <button onClick={() => handleDeleteLesson(lesson.id)}>
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleGetDataEditLesson(lesson);
                    setModalEditLesson(true);
                  }}
                >
                  Edit
                </button>
              </div>
            ),
          },
        ]}
        dataSource={lessonsForCurrentCourse}
      />
    );
  };

  return (
    <>
      <div className="admin_course_page_container">
        <div className="admin_course_page_header">
          <h2>COURSES :</h2>
          <div className="search_course">
            <IoIosSearch className="search_icon" />
            <input
              onChange={handleChangeSearch}
              value={searchValue}
              autoFocus
              type="text"
              placeholder="Tìm kiếm ..."
              className="search_bar"
            />
          </div>
          <button onClick={handleShowCourse} className="admin_course_button">
            {FreeCourse ? "Show Pay Course" : "Show Free Course"}
          </button>
          <button
            className="admin_course_button"
            onClick={() => setModalAdd(true)}
          >
            Add Course
          </button>
        </div>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: renderExpandedRow,
            onExpand: handleRowExpand,
            rowExpandable: (record) => record.courseName !== "Not Expandable",
          }}
          dataSource={courses.filter((item) =>
            FreeCourse ? item.price === 0 : item.price !== 0
          )}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
      {modalEdit ? (
        <ModalEdit dataEdit={dataEdit} offModalEdit={offModalEdit} />
      ) : null}
      {modalAdd ? <ModalAdd offModalAdd={offModalAdd} /> : null}
      {modalEditLesson ? (
        <ModalEditLesson
          dataEditLesson={dataEditLesson}
          offModalLessonEdit={offModalEditLesson}
        />
      ) : null}
      {modalAddLesson ? (
        <ModalAddLesson
          courseId={courseId}
          offModalLessonAdd={offModalAddLesson}
        />
      ) : null}
    </>
  );
};

export default AdminCourse;
