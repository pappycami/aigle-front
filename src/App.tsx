import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/"
        element={ 
          <PrivateRoute>
             <HomePage /> 
          </PrivateRoute> 
        }
      />
    </Routes>
  );
}

export default App;
