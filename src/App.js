import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row, Col, Button } from "reactstrap";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

function App() {
  const [todo, setTodo] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    fetch("https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list")
      .then(response => response.json())
      .then(item => setTodo(item));
  }, []);

  const toggleModal = () => setOpenCreate(!openCreate);

  const todosChange = id => {
    const updatedTodo = todo.map(data => {
      if (data.id === id) data.status = data.status === 0 ? 1 : 0;
      return data;
    });
    setTodo(updatedTodo);
  };

  const todosDelete = index => setTodo(todo.filter((item, i) => index !== i));

  const todosCreate = ({ title, desc }) => {
    const id = todo[todo.length - 1].id + 1;
    const data = {
      id: id,
      title: title,
      description: desc,
      status: 0,
      createdAt: new Date().toJSON()
    };
    setTodo([...todo, data]);
  };

  const todosUpdate = (value, index) => {
    let data = todo;
    data[index] = value;
    setTodo([...data]);
  };

  return (
    <Container>
      <Row>
        <Col xs="6">
          <div style={{ display: "flex", padding: 16 }}>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>To Do</span>
            &nbsp;
            <Button size="sm" color="info" onClick={toggleModal}>
              Add To Do
            </Button>
          </div>
          {todo
            .filter(({ status }) => status === 0)
            .map(data => {
              const index = todo.findIndex(item => item.id === data.id);
              return (
                <TodoItem
                  key={data.id}
                  item={data}
                  index={index}
                  onChange={todosChange}
                  onDelete={todosDelete}
                  onEdit={todosUpdate}
                />
              );
            })}
        </Col>
        <Col xs="6">
          <div style={{ display: "flex", padding: 16 }}>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>Completed</span>
          </div>
          {todo
            .filter(({ status }) => status === 1)
            .map(data => {
              const index = todo.findIndex(item => item.id === data.id);
              return (
                <TodoItem
                  key={data.id}
                  item={data}
                  index={index}
                  onChange={todosChange}
                  onDelete={todosDelete}
                  onEdit={todosUpdate}
                />
              );
            })}
        </Col>
      </Row>
      <TodoForm
        modalTitle="Add To Do"
        onSubmit={todosCreate}
        open={openCreate}
        handleOpen={toggleModal}
      />
    </Container>
  );
}

export default App;
