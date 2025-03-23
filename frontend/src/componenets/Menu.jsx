import { useEffect,useState } from "react"
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Menu(){

    const [menucard,setMenucard]=useState([])


    async function getMenuCard() {
        try {
          const response = await axios.get("http://localhost:5000/menucard/");
          setMenucard(response.data.menu);
        } catch (error) {
          console.error("Error fetching menu:", error);
        }
      }

    useEffect(()=>{

        getMenuCard()

    },[])

    return(
        <>

        <Container className="mt-4">
              <h1 className="text-center mb-4">Menu Card</h1>
            
        
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Menu ID</th>
                    <th>Menu Name</th>
                    <th>Menu Type</th>
                    <th>Menu Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {menucard.map((item) => (
                    <tr key={item.mid}>
                      <td>{item.mid}</td>
                      <td>{item.mname}</td>
                      <td>{item.fg_name}</td>
                      <td>{item.qtype}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
            <br />

            <center>
            <Link to="/food-groups" className="btn-get-started">View Food Groups</Link>
            <br />
            <Link to="/quantities" className="btn-get-started">View Quantities</Link>
            </center>

              
            <br /><br />
        
        </>
    )
}