export interface User {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface Movie {
  id: string;
  title: string;
  year: string;
  publishYear?: string;
  imageUrl: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateMovieDto {
  title: string;
  year: string;
  imageFile?: File;
}

export interface UpdateMovieDto extends Partial<CreateMovieDto> {
  id: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}