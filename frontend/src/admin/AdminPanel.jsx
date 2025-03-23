
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Navbar, Button, Row, Col, Card, ListGroup } from "react-bootstrap";
import { FaUtensils, FaLayerGroup, FaBalanceScale, FaSignOutAlt, FaTachometerAlt, FaHome } from "react-icons/fa";
import AddMenu from "../admin/controllers/AddMenu";
import AddFoodGroup from "../admin/controllers/AddFoodGroup";
import AddQuantity from "../admin/controllers/AddQuantity";

function AdminPanel() {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await axios.post("http://localhost:5000/admin/logout", {}, { withCredentials: true });
        alert("Logged out successfully!");
        navigate("/admin-login");
      } catch (err) {
        console.error("Logout failed", err);
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="px-3">
        <Navbar.Brand><FaTachometerAlt className="me-2" /> Admin Panel</Navbar.Brand>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="bg-light min-vh-100 p-3 border-end">
            <ListGroup>
              <ListGroup.Item action active={activeComponent === "dashboard"} onClick={() => setActiveComponent("dashboard")}>
                <FaHome className="me-2" /> Dashboard
              </ListGroup.Item>
              <ListGroup.Item action active={activeComponent === "menu"} onClick={() => setActiveComponent("menu")}>
                <FaUtensils className="me-2" /> Manage Menu
              </ListGroup.Item>
              <ListGroup.Item action active={activeComponent === "foodgroup"} onClick={() => setActiveComponent("foodgroup")}>
                <FaLayerGroup className="me-2" /> Manage Food Groups
              </ListGroup.Item>
              <ListGroup.Item action active={activeComponent === "quantity"} onClick={() => setActiveComponent("quantity")}>
                <FaBalanceScale className="me-2" /> Manage Quantity
              </ListGroup.Item>
              <ListGroup.Item action variant="danger" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className="p-4">
            <Card className="p-4 shadow">
              {activeComponent === "dashboard" && (
                <p className="text-center text-muted">Welcome to the Admin Dashboard</p>
              )}
              {activeComponent === "menu" && <AddMenu />}
              {activeComponent === "foodgroup" && <AddFoodGroup />}
              {activeComponent === "quantity" && <AddQuantity />}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminPanel;


