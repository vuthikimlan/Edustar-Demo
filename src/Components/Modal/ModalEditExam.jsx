import { Button, Form, Input, Modal } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext/AppContext";
import { useForm } from "antd/es/form/Form";

function ModalEditExam({idExam , dataExam}) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, dispatch } = useContext(AppContext);
  const { isOpenModalEditExam } = data;

  const handleCancel = () => 
  {
    form.resetFields();
    dispatch({ type: "closeModalEditExam" });
    
  };
  const onFinish = (values) =>{
    dispatch({ type: "closeModalEditExam" });
    console.log(values);
  }
  console.log(dataExam);
  const [form] = useForm()

  return (
    <div>
      <Modal
        open={isOpenModalEditExam}
        destroyOnClose={true}
        maskClosable={false}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}

      >
       <h2 className="text-center font-medium text-xl mb-10">{"Chỉnh sửa thông tin "} </h2>
       {/* <h2>{idExam} </h2> */}
       <Form
        name="basic"
        preserve={false}
        
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={dataExam}
        onFinish={onFinish}
        
        // autoComplete="off"
      >
        <Form.Item
          label="Tên bài thi"
          name="name"
          // initialValue={}
          rules={[
            {
              required: true,
              message: "Nhập tên bài thi!",
            },
          ]}
        >
          <Input className="mb-1"  />
        </Form.Item>
        <Form.Item
          label="Thời gian bài thi (phút)"
          name="timeExam"
          rules={[
            {
              required: true,
              message: "Nhập thời gian của bài thi !",
            },
          ]}
        >
          <Input className="mb-1" type="number"/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="">
           Save
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </div>
  );
}

// sửa đổi
export default ModalEditExam;
