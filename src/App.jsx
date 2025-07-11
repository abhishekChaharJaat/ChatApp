import "./App.css";
import BaseLayout from "./Base/BaseLayout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Contactpage from "./Pages/Contactpage";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./Base/ProtectedRoute";

function App() {
  return (
    <BaseLayout>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Homepage />} />
          </Route>
        </Routes>
      </Router>
    </BaseLayout>
  );
}

export default App;
