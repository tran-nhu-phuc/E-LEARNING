import React, { ChangeEvent, useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Popconfirm, Table } from "antd";
import "./users.css";
import { IntfUser } from "../../types/interface";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import formatPrice from "../../common/formatPrice.common";
import UserService from "../../services/user.service";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import LessonService from "../../services/lesson.service";
import { update } from "../../store/reducers/update";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const AdminUser: React.FC = () => {
  const userService = new UserService();
  const [users, setUser] = useState<any[]>([]);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IntfUser>();
  const [FreeUser, setFreeUser] = useState<boolean>(false);
  const [expandedLessons, setExpandedLessons] = useState<any[]>([]); // Trạng thái mới
  const updateStatus = useSelector((state: any) => state.update);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const getUser = async () => {
    const result = await userService.getAllUsers();
    setUser(result);
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
    sorter: SorterResult<IntfUser>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUser([]);
    }
  };
  const columns: TableColumnsType<IntfUser> = [
    // {
    //   key: "id",
    //   title: "Id",
    //   dataIndex: "id",
    //   render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    // },
    {
      key: "Email",
      title: "email",
      dataIndex: "email",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "lastName",
      title: "Last Name",
      dataIndex: "lastName",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "firstName",
      title: "First Name",
      dataIndex: "firstName",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "avatar",
      title: "Avatar",
      dataIndex: "avatar",
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
          alt="ảnh avatar"
        />
      ),
      width: "10%",
    },

    {
      key: "key",
      title: "Action",
      dataIndex: "",
      render: (dataIndex: number, record: any) => (
        <div className="user_action_button">
          <button>Block</button>
          <button>Block Comment</button>
        </div>
      ),
    },
  ];
  const fetchData = async () => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: users.length,
      },
    });
  };
  const offModalEdit = () => {
    setModalEdit(false);
  };
  const offModalAdd = () => {
    setModalAdd(false);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (newValue !== "") {
      const searchString = newValue.toLowerCase();
      const usersAfterFilter = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchString)
      );
      setUser(usersAfterFilter);
    } else {
      getUser();
    }
  };
  const handleShowUser = () => {
    setFreeUser(!FreeUser);
  };

  useEffect(() => {
    fetchData();
    getUser();
  }, [JSON.stringify(tableParams), updateStatus]);

  return (
    <>
      <div className="admin_user_page_container">
        <div className="admin_user_page_header">
          <h2>User :</h2>
          <div className="search_user">
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
          dataSource={users}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
};

export default AdminUser;
