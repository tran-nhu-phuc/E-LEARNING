import React, { ChangeEvent, useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Popconfirm, Table } from "antd";
import "./comment.css";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import formatPrice from "../../common/formatPrice.common";
import CommentsService from "../../services/comment.service";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import LessonService from "../../services/lesson.service";
import { update } from "../../store/reducers/update";
import { IntfComment } from "../../types/interface";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const AdminComments: React.FC = () => {
  const commentService = new CommentsService();
  const [comments, setComments] = useState<any[]>([]);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IntfComment>();
  const [FreeComments, setFreeComments] = useState<boolean>(false);
  const [expandedLessons, setExpandedLessons] = useState<any[]>([]); // Trạng thái mới
  const updateStatus = useSelector((state: any) => state.update);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const getComments = async () => {
    const result = await commentService.getAllComments();
    setComments(result);
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
    sorter: SorterResult<IntfComment>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setComments([]);
    }
  };
  const columns: TableColumnsType<IntfComment> = [
    // {
    //   key: "id",
    //   title: "Id",
    //   dataIndex: "id",
    //   render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    // },
    {
      key: "userId",
      title: "User ID",
      dataIndex: "userId",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "courseId",
      title: "Course ID",
      dataIndex: "courseId",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "content",
      title: "Comment Content",
      dataIndex: "content",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },

    {
      key: "key",
      title: "Action",
      dataIndex: "",
      render: (dataIndex: number, record: any) => (
        <div className="comment_action_button">
          <button>Active Comment</button>
          <button>Block Comment</button>
        </div>
      ),
    },
  ];
  // const fetchData = async () => {
  //   setTableParams({
  //     ...tableParams,
  //     pagination: {
  //       ...tableParams.pagination,
  //       total: comments.length,
  //     },
  //   });
  // };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (newValue !== "") {
      const searchString = newValue.toLowerCase();
      const commentsAfterFilter = comments.filter((comment) =>
        comment.firstName.toLowerCase().includes(searchString)
      );
      setComments(commentsAfterFilter);
    } else {
      getComments();
    }
  };
  useEffect(() => {
    // fetchData();
    getComments();
  }, [JSON.stringify(tableParams), updateStatus]);

  return (
    <>
      <div className="admin_comment_page_container">
        <div className="admin_comment_page_header">
          <h2>Comments :</h2>
          <div className="search_comment">
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
        </div>
        <Table
          columns={columns}
          dataSource={comments}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
};

export default AdminComments;
