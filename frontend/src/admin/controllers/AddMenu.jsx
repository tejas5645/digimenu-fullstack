import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

export default function AddMenu() {
  const [menuList, setMenuList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [menu, setMenu] = useState({ mname: "", mtype: "", mqty: "", price: 0 })

  async function getMenu() {
    try {
      const response = await axios.get("http://localhost:5000/menu/");
      setMenuList(response.data.menu);
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  async function saveMenu(e) {
    e.preventDefault();

    if (!menu.mname || !menu.mtype || !menu.mqty || !menu.price) {
      alert("All fields are required!");
      return;
    }

    try {
      const data = {
        mname: menu.mname,
        mtype: menu.mtype,
        mqty: menu.mqty,
        price: menu.price
      }
      const response = await axios.post("http://localhost:5000/admin/menu", data, { withCredentials: true });
      alert(response.data.message || "Added successfully!");
      setShowForm(false);
      getMenu();
    } catch (error) {
      alert(error.response.data.message || "Error adding menu!");
    }
  }

  async function updateMenu(e) {
    e.preventDefault();

    try {

      const data = {
        mname: menu.mname,
        mtype: menu.mtype,
        mqty: menu.mqty,
        price: menu.price
      }

      const response = await axios.put(`http://localhost:5000/admin/menu/${menu.mid}`, data, { withCredentials: true });
      alert(response.data.message || "Updated successfully!");
      setShowForm(false);
      getMenu();
    } catch (error) {
      alert(error.response.data.message || "Error updating menu!");
    }
  }


  async function deleteMenu(item) {
    try {
      if (window.confirm(`Are you sure you want to delete ${item.mname}`)) {

        await axios.delete(`http://localhost:5000/admin/menu/${item.mid}`, { withCredentials: true });
        alert("Deleted Successfully")

        getMenu();
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  

  function handleAdd() {
    setMenu({ mname: "", mtype: "", mqty: "", price: 0 })
    setEditItem(null);
    setShowForm(true);
  }

  function handleUpdate(item) {
    setEditItem(item);
    setMenu(item)
    setShowForm(true);
  }

  function handleChange(e) {
    setMenu({ ...menu, [e.target.name]: e.target.value });
  }
  
  function handleClose(){
    setShowForm(false)
  }

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Menu</h1>



      <center>
        <Button onClick={handleAdd} variant="success">Add Menu</Button>

      </center>
      <br />


      {/* Modal */}
      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editItem ? "Update Menu" : "Add Menu"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Menu Name</Form.Label>
              <Form.Control
                type="text"
                name="mname"
                value={menu.mname}
                onChange={handleChange}
                placeholder="Enter Menu Name"
              />
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="mtype"
                value={menu.mtype}
                onChange={handleChange}
                placeholder="Enter Menu Type"
              />
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="mqty"
                value={menu.mqty}
                onChange={handleChange}
                placeholder="Enter Menu Quantity"
              />
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={menu.price}
                onChange={handleChange}
                placeholder="Enter Menu Price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={editItem ? updateMenu : saveMenu}>
            {editItem ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>


      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Menu ID</th>
            <th>Menu Name</th>
            <th>Menu Type</th>
            <th>Menu Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuList.map((item) => (
            <tr key={item.mid}>
              <td>{item.mid}</td>
              <td>{item.mname}</td>
              <td>{item.mtype}</td>
              <td>{item.mqty}</td>
              <td>{item.price}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleUpdate(item)}>Update</Button>
                <Button size="sm" variant="danger" onClick={() => deleteMenu(item)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}





