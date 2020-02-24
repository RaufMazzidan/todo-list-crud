import React, { Fragment, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  Row,
  Col,
  Button
} from "reactstrap";
import TodoForm from "./TodoForm";

function TodoItem(props) {
  const [modal, setModal] = useState(null);

  const {
    item: { id, status, title, description } = {},
    onChange,
    onDelete,
    onEdit,
    index
  } = props;

  const completed = Boolean(status);

  const modalClose = () => setModal(null);

  const todosUpdate = ({ title, desc }) => {
    const data = {
      ...props.item,
      title,
      description: desc
    };
    onEdit(data, index);
  };

  return (
    <Fragment>
      <Card style={{ width: "100%" }}>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <CardText>{description}</CardText>
        </CardBody>
        <CardFooter style={{ display: "flex", justifyContent: "flex-end" }}>
          <Row noGutters>
            {!completed && (
              <Col>
                <Button size="sm" color="success" onClick={() => onChange(id)}>
                  Completed
                </Button>
              </Col>
            )}
            &nbsp;
            <Col>
              <Button size="sm" color="warning" onClick={() => setModal(index)}>
                Edit
              </Button>
            </Col>
            &nbsp;
            <Col>
              <Button size="sm" color="danger" onClick={() => onDelete(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
      <br/>
      {modal !== null && modal >= 0 && (
        <TodoForm
          modalTitle="Edit To Do"
          onSubmit={todosUpdate}
          open={modal !== null && modal >= 0}
          handleOpen={modalClose}
          defaultValue={{ title, description }}
        />
      )}
    </Fragment>
  );
}

export default TodoItem;
