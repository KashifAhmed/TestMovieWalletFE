import axios from "axios";
import type { CreateMovieDto, Movie, UpdateMovieDto } from "../../../types/global";
import type { MoviesResponse } from "../types";
import { getAuthHeaders, handleApiError } from "../../../lib/api.utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export class MovieService {
  static async getMovies(): Promise<MoviesResponse> {
    try {
      const headers = await getAuthHeaders('json');

      const response = await axios.get<MoviesResponse>(
        `${BASE_URL}/movies`,
        {
          headers,
          timeout: 10000, 
        }
      );

      return response.data;
    } catch (error) {
      return handleApiError(error, 'fetching movies');
    }
  }

  static async getMovie(id: string): Promise<Movie | null> {
    try {
      const headers = await getAuthHeaders('json');

      const response = await axios.get(`${BASE_URL}/movies/${id}`, {
        headers,
      });
      console.log('getMovie API response:', response.data);

      const movieData = response.data?.data || response.data;
      return movieData;
    } catch (error) {
      return handleApiError(error, 'fetching movie');
    }
  }

  static async createMovie(movieData: CreateMovieDto): Promise<Movie | null> {
    try {
      const headers = await getAuthHeaders('form-data');

      const formData = new FormData();
      formData.append('title', movieData.title);
      formData.append('publishYear', movieData.year);

      if (movieData.imageFile) {
        formData.append('image', movieData.imageFile);
      }

      const response = await axios.post(`${BASE_URL}/movies`, formData, {
        headers,
      });

      return response.data;
    } catch (error) {
      return handleApiError(error, 'creating movie');
    }
  }

  static async updateMovie(movieData: UpdateMovieDto): Promise<Movie | null> {
    try {
      const headers = await getAuthHeaders('form-data');

      const formData = new FormData();

      if (movieData.title) {
        formData.append('title', movieData.title);
      }

      if (movieData.year) {
        formData.append('publishYear', movieData.year);
      }

      if (movieData.imageFile) {
        formData.append('image', movieData.imageFile);
      }

      const response = await axios.patch(`${BASE_URL}/movies/${movieData.id}`, formData, {
        headers,
      });

      return response.data;
    } catch (error) {
      return handleApiError(error, 'updating movie');
    }
  }

  static async deleteMovie(id: number): Promise<boolean> {
    try {
      const headers = await getAuthHeaders('json');

      await axios.delete(`${BASE_URL}/movies/${id}`, {
        headers,
      });
      return true;
    } catch (error) {
      return handleApiError(error, 'deleting movie');
    }
  }
}