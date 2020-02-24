import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button
} from "reactstrap";

function TodoForm(props) {
  const { open, handleOpen, onSubmit, defaultValue, modalTitle } = props;

  const { title: defaultTitle, description: defaultdesc } = defaultValue || {};
  const [title, setTitle] = useState(defaultTitle);
  const [desc, setdesc] = useState(defaultdesc);

  const handleSubmit = async () => {
    await onSubmit({ title, desc })
    await handleOpen()
    await setTitle('')
    await setdesc('')
  }

  return (
    <Modal isOpen={open} toggle={handleOpen}>
      <ModalHeader toggle={handleOpen}>{modalTitle}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Input Todo Title"
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input
            type="textarea"
            placeholder="Input Todo Description"
            value={desc}
            onChange={({ target: { value } }) => setdesc(value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalFooter>
    </Modal>
  );
}

export default TodoForm;
