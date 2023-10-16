import { Button, Drawer, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { delAllUser, deleteUser, getListUser } from "../../../../Services/lead";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import AddEditUser from "../../../AddEdit/AddEditUser/AddEditUser";
import DetailUser from "../../../Details/DetailUser/DetailUser";

function NonVerifiedCustomer(props) {
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState();
  const [openModal, setOpenModal] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { confirm } = Modal;

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const showhowConfirm = () => {
    confirm({
      title: "Xoá người dùng ",
      content:
        "Việc này sẽ xóa người dùng được chọn. Bạn có chắc chắn muốn xóa?",
      onOk: handleDeleteAll,
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteAll = () => {
    delAllUser(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          handleGetCustomer();
          setSelectedRowKeys([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi xóa người dùng", error);
      });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleGetCustomer = () => {
    getListUser().then((res) => {
      setData(res.data?.data?.items);
    });
  };

  const nonVerifiedCustomer = data.filter(
    (customer) =>
      customer?.verified === false && customer?.role?.roleId === "CUSTOMER"
  );
  console.log("nonVerifiedCustomer", nonVerifiedCustomer);
  // Hàm xóa từng người dùng
  const handleDelete = (userId) => {
    deleteUser(userId).then((res) => {
      if (res.status === 200) {
        handleGetCustomer();
      }
    });
  };
  useEffect(() => {
    handleGetCustomer();
    setLoading(false);
  }, []);
  const columns = [
    {
      title: "Tên người dùng ",
      dataIndex: "name",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },

    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Vai trò",
      dataIndex: ["role", "name"],
    },

    {
      title: "Action",
      key: "action",
      render: (e, record, idx) => (
        <Space>
          <Button
            className="update"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentData(record);
              setOpenModal(true);
            }}
          ></Button>
          <Button
            className="delete"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(record.userId);
            }}
          ></Button>
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              console.log("drawer");
              setOpenDrawer(true);
              navigate(`/adminpage/customer/detailcustomer/${record.userId}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title="Tất cả khách hàng đã xác thực"
        extra={[
          <Space>
            <Button
              onClick={() => {
                navigate("/adminpage/verifiedCustomer");
              }}
            >
              Khách hàng đã xác thực
            </Button>
            <Button
              onClick={() => {
                navigate("/adminpage/customer");
              }}
            >
              Quay lại
            </Button>
          </Space>,
        ]}
      >
        <AddEditUser
          onSuccess={() => {
            handleGetCustomer();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentData({});
            }
          }}
          data={currentData}
        />
        <Drawer
          title="Thông tin chi tiết khách hàng"
          width={550}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            navigate("/adminpage/customer");
          }}
        >
          <DetailUser />
        </Drawer>

        <Table
          rowKey={"userId"}
          columns={columns}
          dataSource={nonVerifiedCustomer}
          size="middle"
          rowSelection={rowSelection}
          pagination={{
            pageSize: 7,
          }}
          scroll={{
            y: 413,
          }}
          x
          loading={loading}
        />
        <div
          className="absolute bottom-6"
          style={{ display: hasSelected ? "block" : "none" }}
        >
          <>Đã chọn {selectedRowKeys.length}</>
          <Button
            className="bg-white ml-2.5 py-1 px-2.5"
            onClick={() => {
              showhowConfirm();
            }}
            disabled={selectedRowKeys.length === 0}
          >
            <CloseOutlined />
            Xoá
          </Button>
        </div>
      </PageContainer>
    </div>
  );
}

export default NonVerifiedCustomer;
