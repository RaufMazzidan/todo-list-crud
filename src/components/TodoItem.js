import React, { Fragment, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroupItem
} from "reactstrap";
import TodoForm from "./TodoForm";

function TodoItem(props) {
  const [modal, setModal] = useState(null);
  const [detail, setDetail] = useState(null);

  const {
    item: { id, status, title, description } = {},
    onChange,
    onDelete,
    onEdit,
    index
  } = props;

  const completed = Boolean(status);

  const modalClose = () => setModal(null);

  const modalDetailToggle = () => setDetail(!detail);

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
      <ListGroupItem className="item" onClick={modalDetailToggle}>{title}</ListGroupItem>
      <Modal isOpen={detail} toggle={modalDetailToggle}>
        <ModalHeader toggle={modalDetailToggle}>{title}</ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="sm" color="success" onClick={() => onChange(id)}>
            {completed ? "Back To Todo" : "Completed"}
          </Button>
          &nbsp;
          <Button size="sm" color="warning" onClick={() => setModal(index)}>
            Edit
          </Button>
          &nbsp;
          {!completed &&  (
            <Button size="sm" color="danger" onClick={() => onDelete(index)}>
              Delete
            </Button>
          )}
        </ModalFooter>
      </Modal>
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
