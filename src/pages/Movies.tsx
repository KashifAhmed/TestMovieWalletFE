import React, { useEffect, useState } from "react";
import LogOutIcon from "../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MovieCard } from "../features/movies/components";
import { toast } from "react-toastify";
import { Loader, PageLayout } from "../components";
import { ConfirmModal } from "../components/ui/Modal";
import { MovieService } from "../features/movies";
import type { Movie } from "../types/global";

const Movies: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

  const navigate = useNavigate();
  const { signOut } = useAuth();
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await MovieService.getMovies(currentPage, itemsPerPage);
        setMovies(response.data || []);
        setTotalPages(response.meta.totalPages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handleAddMovie = () => {
    navigate('/movie-manager');
  };

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
  };

  const handleEditMovie = (id: string) => {
    navigate(`/movie-manager/${id}`);
  };

  const handleDeleteMovie = (id: string) => {
    setMovieToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteMovie = async () => {
    if (!movieToDelete) return;

    try {
      const success = await MovieService.deleteMovie(movieToDelete);
      if (success) {
        toast.success("Movie deleted successfully");

        // If we deleted the last item on the current page and we're not on page 1, go back a page
        if (movies.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          // Otherwise, refetch the current page
          const response = await MovieService.getMovies(currentPage, itemsPerPage);
          setMovies(response.data || []);
          setTotalPages(response.meta.totalPages || 1);
        }
      } else {
        toast.error("Failed to delete movie");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("An error occurred while deleting the movie");
    }

    setShowDeleteModal(false);
    setMovieToDelete(null);
  };

  const cancelDeleteMovie = () => {
    setShowDeleteModal(false);
    setMovieToDelete(null);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader size="lg" text="" />
        </div>
      </PageLayout>
    );
  }

  
  if (movies.length === 0) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center px-6">
            <h1 className="text-h2 font-semibold text-white mb-8">
              Your movie list is empty
            </h1>
            <button
              onClick={handleAddMovie}
              className="bg-primary hover:bg-green-400 text-white font-semibold text-body px-8 py-3 rounded-lg transition duration-200 shadow-lg"
            >
              Add a new movie
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="pb-20">
        {/* Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl md:text-h2 font-semibold text-white">
                  My movies
                </h1>
                <button
                  onClick={handleAddMovie}
                  className="md:w-8 md:h-8 sm:h-6 sm:w-6 bg-transparent border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-background transition duration-200"
                  title="Add movie"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-body text-white hover:text-primary transition duration-200 group"
                title="Logout"
              >
                <span className="hidden sm:inline">Logout</span>
                <img
                  src={LogOutIcon}
                  className="w-6 h-6 transition duration-200 group-hover:filter group-hover:brightness-0 group-hover:saturate-0 group-hover:invert-[70%]"
                  alt="Logout"
                />
              </button>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={movie.publishYear || movie.year}
                  imageUrl={movie.image || movie.imageUrl}
                  onEdit={handleEditMovie}
                  onDelete={handleDeleteMovie}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mb-20">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="w-10 h-10 text-h6 font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition text-body ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "bg-card text-white hover:bg-input"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 text-h6 font-bold text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Movie"
        message="Are you sure you want to delete this movie? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="error"
        onConfirm={confirmDeleteMovie}
        onCancel={cancelDeleteMovie}
      />
    </PageLayout>
  );
};

export default Movies;