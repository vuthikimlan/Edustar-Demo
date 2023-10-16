import { Button, Form, Input, Modal } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext/AppContext";
import { useForm } from "antd/es/form/Form";

function ModalEditSection({idSection , dataSection}) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, dispatch } = useContext(AppContext);
  const { isOpenModalEditSection } = data;

  const handleCancel = () => 
  {
    form.resetFields();
    dispatch({ type: "closeModalEditSection" });
    
  };
  const onFinish = (values) =>{
    dispatch({ type: "closeModalEditSection" });
    console.log(values);
  }
  console.log(dataSection);
  const [form] = useForm()

  return (
    <div>
      <Modal
        open={isOpenModalEditSection}
        destroyOnClose={true}
        maskClosable={false}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}

      >
       <h2 className="text-center font-medium text-xl mb-10">{"Chỉnh sửa thông tin phần thi"} </h2>
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
        initialValues={dataSection}
        onFinish={onFinish}
        
        // autoComplete="off"
      >
        <Form.Item
          label="Tiêu đề phần thi"
          name="title"
          // initialValue={}
          rules={[
            {
              required: true,
              message: "Nhập tiêu đề phần thi!",
            },
          ]}
        >
          <Input className="mb-1"  />
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
export default ModalEditSection;
