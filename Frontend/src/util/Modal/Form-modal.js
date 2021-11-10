import React, {useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap';

const PopUp = (props) => {
  const {
    fetchModalToParentData
  } = props
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [priority, setPriority] = useState("");

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      fetchModalToParentData({
        url,
        title,
        priority
      })
      setUrl("")
      setTitle("")
      setPriority("")
      handleClose()
    }
  };
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Generate
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Web Scraping</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control required type="text" placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>URL</Form.Label>
            <Form.Control required type="text" placeholder="Enter URL"
              value={url}
              onChange={e => setUrl(e.target.value)}  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Priority</Form.Label>
            <Form.Control required type="number" pattern="[0-9]*" placeholder="Enter Priority"
            value={priority}
            onChange={e => setPriority((e.target.value>0 && e.target.value<11) ? e.target.value : priority )}   />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
  
export default PopUp;