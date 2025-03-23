import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  async function auth() {

    try {
      const res = await axios.get("http://localhost:5000/admin/check-session", { withCredentials: true })
      setIsAuthenticated(res.data.loggedIn)
    }
    catch (err) {
      setIsAuthenticated(false)
    }

  }

  useEffect(() => {
    auth()
  }, []);

  if (isAuthenticated === null)
    return <p>Loading...</p>;

  console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/unauthorized" />;
}

export default ProtectedRoute;
