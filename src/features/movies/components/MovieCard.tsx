import React from 'react';

interface MovieCardProps {
  id: number;
  title: string;
  year: string;
  imageUrl: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  year,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="group cursor-pointer">
      {/* Movie Poster */}
      <div className="bg-card md:p-2 p-0  rounded-xl sm:rounded-t-xl sm:rounded-b-none md:rounded-xl mb-4 hover:bg-card/80 transition-all duration-300 backdrop-blur-[100px]">
        {/* Movie Poster */}
        <div className="relative rounded-t-xl sm:rounded-t-xl sm:rounded-b-none md:rounded-lg overflow-hidden aspect-[2/3] mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x450/2D5563/ffffff?text=No+Image';
            }}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-400 transition text-body-sm font-semibold w-full"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="bg-error text-white px-6 py-2 rounded-lg hover:bg-red-400 transition text-body-sm font-semibold w-full"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Movie Info */}
        <div className="px-2 pb-3">
          <h3 className="text-body-lg font-medium text-white truncate">
            {title}
          </h3>
          <p className="text-body-sm text-white font-regular">{year}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;