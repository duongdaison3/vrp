import React from 'react';
import { authHeader } from '../helpers';
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function RenameGroupButton(props) {
  const [show, setShow] = React.useState(false);
  const [input, setInput] = React.useState(props.oldTitle);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => { setInput(event.target.value) }
  const handleSubmit = async () => {
    try {
      const result = await fetch(`http://localhost:3001/api/wordGroups/${props.id}`, {
        method: 'PUT',
        headers: authHeader(),
        credentials: 'include',
        body: JSON.stringify({
          name: input
        }),
      }).then((res) => { return res.json(); })

      if (result._id) {
        props.resetData();
      }

    }
    catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <>
      <ListItem button onClick={handleShow} style={{ border: '1px solid gray', borderRadius:'15px' }}>
        <ListItemText primary="Rename" />
      </ListItem>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>NEW GROUP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="input_basic"
            placeholder="Group Word Name"
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RenameGroupButton;