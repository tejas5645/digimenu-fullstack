import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            Access Denied
            <p>You do not have permission to view this page.</p>
            <Link to="/admin-login">Go to Login</Link>
        </div>
    );
}

export default Unauthorized;
