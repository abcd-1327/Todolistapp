import { Button, Table, Form, Input, DatePicker } from "antd";
import "antd/dist/antd.css";
import Header from "./Header";
// import select from "./select";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react/cjs/react.development";
import "./styles.css";

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const dateFormat = "YYYY/MM/DD";
  const [form] = Form.useForm();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  // <<<<<<-------Populating------->>>>>//
  useEffect(() => {
    const data = [];
    for (let index = 0; index < 51; index++) {
      data.push({
        srno: `${index}`,
        key: `${index}`,
        Title: `title ${index}`
      });
    }
    setDataSource(data);
  }, []);
  const columns = [
    // {
    //   title: "Sr.no",
    //   dataIndex: "srno",
    //   width: "5%",
    //   sorter: (a, b) => a.srno - b.srno,
    //   sortDirections: ["descend"]
    // },
    {
      title: "Title",
      dataIndex: "title",
      widht: "20%",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter your Title"
                }
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter your descritpion."
                }
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      }
    },
    {
      title: "Due date",
      dataIndex: "date",
      width: "20%",
      render: (text) => {
        return (
          <DatePicker
            defaultValue={moment("2022/03/10", dateFormat)}
            format={dateFormat}
          />
        );
      }
    },
    {
      title: "Status",
      dataIndex: "status",

      render: (text, record) => {
        return (
          <div>
            <select name="" id="name">
              <option value="open">OPEN</option>
              <option value="working">Working</option>
              <option value="done">Done</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        );
      }
    },

    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="tags">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      }
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  srno: record.srno,
                  title: record.title,
                  description: record.description,
                  tags: record.tags
                });
              }}
            >
              Add task
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      }
    }
  ];
  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };
  return (
    <div className="App">
      <div className="head">
        <Header />
      </div>
      <header className="App-header">
        <div class="container-fluid">
          <h2> click on add task button below to start </h2>
          <Form form={form} onFinish={onFinish}>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={{ position: ["topRight"] }}
            ></Table>
          </Form>
        </div>
      </header>
    </div>
  );
}

export default App;
