
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  message,
  notification,
} from "antd";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { AppContext } from "../../Components/AppContext/AppContext";
import ModalCreateQuestion from "../../Components/Modal/ModalCreateQuestion";
import { duration } from "moment/moment";

function CreateQuestion() {
  const { data, dispatch } = useContext(AppContext);
  const [form] = Form.useForm();
  const {id} = useParams()
  const [title, setTitle] = useState(null);
  const { listAnswer, listChoiceCorrect, content, listQuestion } = data;
  const handleOpenModalCreateQuestion = async () => {
    dispatch({ type: "openModalCreateQuestion" });
  };
  const navigate = useNavigate();

  const handleSaveContest = () => {};

  const test = () => {
    console.log(listQuestion);
  };
  // const
  const saveDataInLocalStorage = () => {
    if (title === null) {
      notification.error({ message: "Bạn cần nhập tiêu đề" } ,{duration : .1});
      return;
    } else if (listQuestion === null) {
      notification.error({
        message:
          "Không tìm thấy thông tin câu hỏi . Bạn cần tạo câu hỏi trước ",
      });
      return;
    }
    const data = JSON.parse(localStorage.getItem("listContest")) || [];
    data.push({ title: title, questions: listQuestion });
    localStorage.setItem("listContest", JSON.stringify(data));
    // setTitle(null);
    dispatch({ type: "deleteLisQuestion" });
    notification.success({ message: "Lưu thành công phần thi" });
    const err = JSON.parse(localStorage.getItem("listContest"));
    navigate("/adminpage/contest")

    console.log("listQuestion :" ,listQuestion);
  };
  const cancelDataInLocalStorage = () => {
    // localStorage.setItem("listContest", JSON.stringify([]));
    setTitle(null);
    dispatch({ type: "deleteLisQuestion" });
  };

  return (
    <>
      <div className="bg-slate-800 text-white ">
        <div className="flex justify-end pr-10 pt-10">
          <Button
            className="text-white px-10  bg-green-500"
            onClick={() => navigate("/adminpage/contest")}
          >
            Quay lại
          </Button>
          <Button
            className="text-white px-10 bg-teal-600 mx-10"
            icon={<CheckOutlined />}
            onClick={saveDataInLocalStorage}
          >
            Lưu lại
          </Button>

          <Popconfirm
              placement="bottom"
              title={"Bạn có chắc chắn hủy"}
              description={
                "Khi bạn đồng ý tất cả các câu hỏi tạo trước đó sẽ mất đi "
              }
              onConfirm={cancelDataInLocalStorage}
              okText="Yes"
              cancelText="No"
              onCancel={test}
            >
              <Button
                className="text-white bg-red-500"
                icon={<CloseOutlined />}
              >
                Hủy
              </Button>
            </Popconfirm>
        </div>
        <div className="mx-[10%]">
          <p>Nhập vào tiêu đề </p>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập vào tiêu đề"
            className=" mx-auto block my-5"
          />
        </div>

        <div className="ml-[10%]">
          {
            listQuestion?.map((item, index) => (
              <p className="my-1"> {item.content}</p>
            ))}
        </div>

        <Button
          className="text-white ml-[15%] my-3"
          onClick={handleOpenModalCreateQuestion}
        >
          Thêm một câu hỏi
        </Button>
      </div>
      <ModalCreateQuestion />
    </>
  );
}

export default CreateQuestion;
