import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MovieManager from "./pages/MovieManager";
import Movies from "./pages/Movies";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./context/ProtectedRoute";
import { Loader, PageLayout } from "./components";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader size="lg" text="" />
        </div>
      </PageLayout>
    );
  }

  if (user) {
    return <Navigate to="/movies" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background relative">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" replace />} />

            <Route
              path="/signin"
              element={
                <AuthRoute>
                  <SignIn />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              }
            />

            <Route
              path="/movie-manager"
              element={
                <ProtectedRoute>
                  <MovieManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie-manager/:id"
              element={
                <ProtectedRoute>
                  <MovieManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
