import { useRoutes, createBrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { AxiosProvider } from "./contexts/AxiosContext";
import { RouterProvider } from "react-router-dom/dist";

const App = () => {
  const routing = useRoutes(AppRoutes);
  return (
    <AuthProvider>
      <AxiosProvider>
        <div className="dark">
          {routing}
        </div>
      </AxiosProvider>
    </AuthProvider>
  );
};

export default App;
