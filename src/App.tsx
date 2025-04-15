import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from 'react-hot-toast';
import "./App.css";

function App() {
  return (
    <>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

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
    
    </>
    
  );
}

export default App;
