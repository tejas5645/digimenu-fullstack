import { useEffect, useState } from "react"
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Quantities() {

    const [quantity, setQuantity] = useState([])


    async function getQuantity() {
        try {
            const response = await axios.get("http://localhost:5000/quantity/");
            setQuantity(response.data.qtypes);
        } catch (error) {
            console.error("Error fetching quantities:", error);
        }
    }

    useEffect(() => {

        getQuantity()

    }, [])

    return (
        <>

            <Container className="mt-4">
                <h1 className="text-center mb-4">Quantities</h1>


                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Quantity ID</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quantity.map((item) => (
                            <tr key={item.qid}>
                                <td>{item.qid}</td>
                                <td>{item.qtype}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <br />

            <center>
                <Link to="/menu" className="btn-get-started">View Menu</Link>
                <br />
                <Link to="/food-groups" className="btn-get-started">View Food Groups</Link>
            </center>


            <br /><br />

        </>
    )
}