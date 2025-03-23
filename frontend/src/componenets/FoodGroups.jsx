import { useEffect,useState } from "react"
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FoodGroups(){

    const [foodgroup,setFoodgroup]=useState([])


    async function getFoodGroup() {
        try {
          const response = await axios.get("http://localhost:5000/food_group");
          console.log(response.data.food_groups)
          setFoodgroup(response.data.food_groups);
        } catch (error) {
          console.error("Error fetching food_group:", error);
        }
      }

    useEffect(()=>{

        getFoodGroup()

    },[])

    return(
        <>

        <Container className="mt-4">
              <h1 className="text-center mb-4">Food Groups</h1>
            
        
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>FoodGroup ID</th>
                    <th>FoodGroup Name</th>
                  </tr>
                </thead>
                <tbody>
                  {foodgroup.map((item) => (
                    <tr key={item.fid}>
                      <td>{item.fid}</td>
                      <td>{item.fg_name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
            <br />

            <center>
            <Link to="/menu" className="btn-get-started">View Menu</Link>
            <br />
            <Link to="/quantities" className="btn-get-started">View Quantities</Link>
            </center>

              
            <br /><br />
        
        </>
    )
}