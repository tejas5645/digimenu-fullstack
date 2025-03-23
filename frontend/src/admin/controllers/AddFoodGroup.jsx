import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

export default function AddFoodGroup() {
  const [foodgroupList, setFoodgroupList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [foodgroup, setFoodgroup] = useState({ fg_name: "" });

  // Fetch quantities
  async function getFoodgroup() {
    try {
      const response = await axios.get("http://localhost:5000/food_group/");
      setFoodgroupList(response.data.food_groups);
      //alert("Fetched foodgroup data successfully!");
    } catch (error) {
      alert(error.response.data.message || "Error fetching foodgroup data!");
    }
  }

  // Delete a foodgroup
  async function deleteFoodgroup(item) {
    if (!window.confirm(`Are you sure you want to delete ${item.fg_name}?`)) return;

    try {
      const response = await axios.delete(`http://localhost:5000/admin/food_group/${item.fid}`, { withCredentials: true });
      alert(response.data.message || "Deleted successfully!");
      getFoodgroup(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting foodgroup!");
    }
  }

  // Open modal for editing
  function handleUpdate(item) {
    setFoodgroup(item);
    setEditItem(item);
    setShowForm(true);
  }

  // Open modal for adding
  function handleAdd() {
    setFoodgroup({ fg_name: "" });
    setEditItem(null);
    setShowForm(true);
  }

  // Close modal
  function handleClose() {
    setShowForm(false);
  }

  // Handle input change
  function handleChange(e) {
    setFoodgroup({ ...foodgroup, fg_name: e.target.value });
  }

  // Update foodgroup
  async function updateFoodgroup(e) {
    e.preventDefault();

    try {

      const data = {
        fg_name: foodgroup.fg_name
      }

      const response = await axios.put(`http://localhost:5000/admin/food_group/${foodgroup.fid}`, data, { withCredentials: true });
      alert(response.data.message || "Updated successfully!");
      setShowForm(false);
      getFoodgroup();
    } catch (error) {
      alert(error.response.data.message || "Error updating foodgroup!");
    }
  }

  // Add new foodgroup
  async function saveQuantity(e) {
    e.preventDefault();

    if (!foodgroup.fg_name) {
      alert("All fields are required!");
      return;
    }

    try {
      const data = {
        fg_name: foodgroup.fg_name
      }
      const response = await axios.post("http://localhost:5000/admin/food_group", data, { withCredentials: true });
      alert(response.data.message || "Added successfully!");
      setShowForm(false);
      getFoodgroup();
    } catch (error) {
      alert(error.response.data.message || "Error adding foodgroup!");
    }
  }

  useEffect(() => {
    getFoodgroup();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Foodgroup</h1>

      <center>
        <Button onClick={handleAdd} variant="success">Add Foodgroup</Button>
      </center>
      <br />

      {/* Modal */}
      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editItem ? "Update Foodgroup" : "Add Foodgroup"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>FoodGroup Name</Form.Label>
              <Form.Control
                type="text"
                name="fg_name"
                value={foodgroup.fg_name}
                onChange={handleChange}
                placeholder="Enter foodgroup name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={editItem ? updateFoodgroup : saveQuantity}>
            {editItem ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Foodgroup ID</th>
            <th>Foodgroup Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodgroupList.map((item) => (
            <tr key={item.fid}>
              <td>{item.fid}</td>
              <td>{item.fg_name}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleUpdate(item)}>Update</Button>
                <Button size="sm" variant="danger" onClick={() => deleteFoodgroup(item)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
