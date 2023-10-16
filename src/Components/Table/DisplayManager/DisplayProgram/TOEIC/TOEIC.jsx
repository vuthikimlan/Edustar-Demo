import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Space, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import EditDisplay from "../../../../AddEdit/EditDisplayManager/EditDisplay";
import DetailDisplay from "../../../../Details/DetailDisplay/DetailDisplay";
import { getListDisplay } from "../../../../../Services/lead";

function TOEIC(props) {
  const [currentData, setCurrentData] = useState({});
  const [openModal, setOpenModal] = useState();
  const [openDrawer, setOpenDrawer] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleGetTOEIC = () => {
    getListDisplay().then((res) => {
      setData(res?.data?.data?.items);
    });
  };

  const dataToeic = data.filter((toeic) => toeic.type === "TOEIC");

  const columns = [
    {
      title: "Tiêu đề ",
      dataIndex: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <img
          src={imageURL}
          alt={imageURL}
          style={{ width: "90px", height: "90px" }}
        />
      ),
    },

    {
      title: "Vị trí ảnh",
      dataIndex: "location",
    },
    {
      title: "Loại",
      dataIndex: "type",
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
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(
                `/adminpage/displaytoeic/detaildisplaytoeic/${record.id}`
              );
            }}
          ></Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetTOEIC();
    setLoading(false);
  }, []);

  return (
    <div>
      <PageContainer
        title="Banner"
        extra={[
          <Space>
            <Button
              onClick={() => {
                navigate("/adminpage/displayprogram");
              }}
            >
              Quay lại
            </Button>
          </Space>,
        ]}
      >
        <EditDisplay
          onSuccess={() => {
            handleGetTOEIC();
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
          title="Thông tin chi tiết "
          width={500}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <DetailDisplay />
        </Drawer>
        <Table
          columns={columns}
          dataSource={dataToeic}
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{
            y: 390,
          }}
        />
      </PageContainer>
    </div>
  );
}

export default TOEIC;
