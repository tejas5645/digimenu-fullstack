import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

export default function AddQuantity() {
  const [quantityList, setQuantityList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [quantity, setQuantity] = useState({ qtype: "" });

  // Fetch quantities
  async function getQuantity() {
    try {
      const response = await axios.get("http://localhost:5000/quantity/");
      setQuantityList(response.data.qtypes);
      //alert("Fetched quantity data successfully!");
    } catch (error) {
      alert(error.response.data.message || "Error fetching quantity data!");
    }
  }

  // Delete a quantity
  async function deleteQuantity(item) {
    if (!window.confirm(`Are you sure you want to delete ${item.qtype}?`)) return;

    try {
      const response = await axios.delete(`http://localhost:5000/admin/quantity/${item.qid}`, { withCredentials: true });
      alert(response.data.message || "Deleted successfully!");
      getQuantity(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting quantity!");
    }
  }

  // Open modal for editing
  function handleEdit(item) {
    setQuantity(item);
    setEditItem(item);
    setShowForm(true);
  }

  // Open modal for adding
  function handleAdd() {
    setQuantity({ qtype: "" });
    setEditItem(null);
    setShowForm(true);
  }

  // Close modal
  function handleClose() {
    setShowForm(false);
  }

  // Handle input change
  function handleChange(e) {
    setQuantity({ ...quantity, qtype: e.target.value });
  }

  // Update quantity
  async function updateQuantity(e) {
    e.preventDefault();

    try {

      const data = {
        qtype: quantity.qtype
      }

      const response = await axios.put(`http://localhost:5000/admin/quantity/${quantity.qid}`, data, { withCredentials: true });
      alert(response.data.message || "Updated successfully!");
      setShowForm(false);
      getQuantity();
    } catch (error) {
      alert(error.response.data.message || "Error updating quantity!");
    }
  }

  // Add new quantity
  async function saveQuantity(e) {
    e.preventDefault();

    if (!quantity.qtype) {
      alert("All fields are required!");
      return;
    }

    try {
      const data = {
        qtype: quantity.qtype
      }
      const response = await axios.post("http://localhost:5000/admin/quantity", data, { withCredentials: true });
      alert(response.data.message || "Added successfully!");
      setShowForm(false);
      getQuantity();
    } catch (error) {
      alert(error.response.data.message || "Error adding quantity!");
    }
  }

  useEffect(() => {
    getQuantity();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Quantity</h1>

      <center>
        <Button onClick={handleAdd} variant="success">Add Quantity</Button>
      </center>
      <br />

      {/* Modal */}
      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editItem ? "Update Quantity" : "Add Quantity"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="qtype"
                value={quantity.qtype}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={editItem ? updateQuantity : saveQuantity}>
            {editItem ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Quantity ID</th>
            <th>Quantity Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quantityList.map((item) => (
            <tr key={item.qid}>
              <td>{item.qid}</td>
              <td>{item.qtype}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(item)}>Update</Button>
                <Button size="sm" variant="danger" onClick={() => deleteQuantity(item)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
