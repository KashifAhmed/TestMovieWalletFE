import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PageLayout, Button, Input, Loader, FileUpload, YearDropdown } from '../components';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MovieService } from '../features/movies/services/movieService';
import { toast } from 'react-toastify';

interface MovieFormData {
  title: string;
  publishingYear: string;
  imageFile?: File | null;
}

const MovieManager: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<MovieFormData>({
    defaultValues: {
      title: '',
      publishingYear: '',
      imageFile: null,
    },
    mode: 'onBlur',
  });

  const imageFile = watch('imageFile');

  useEffect(() => {
    const loadMovie = async () => {
      if (id) {
        setIsLoadingMovie(true);
        try {
          const movie = await MovieService.getMovie(id);
          console.log('Loaded movie data:', movie);
          if (movie) {
            setValue('title', movie.title || '');
            setValue('publishingYear', movie.year || movie.publishYear || '');
            setImagePreview(movie.imageUrl || movie.image || '');
          }
        } catch (error) {
          console.error('Error loading movie:', error);
          toast.error('Failed to load movie data');
        } finally {
          setIsLoadingMovie(false);
        }
      }
    };

    loadMovie();
  }, [id, setValue]);

  const handleFileChange = (file: File | null, preview: string) => {
    setValue('imageFile', file);
    setImagePreview(preview);
  };

  const onSubmit = async (data: MovieFormData) => {
    setIsLoading(true);

    try {
      if (id) {
        await MovieService.updateMovie({
          id,
          title: data.title.trim(),
          year: data.publishingYear,
          imageFile: data.imageFile || undefined,
        });
        toast.success('Movie updated successfully');
      } else {
        await MovieService.createMovie({
          title: data.title.trim(),
          year: data.publishingYear,
          imageFile: data.imageFile || undefined,
        });
        toast.success('Movie created successfully');
      }

      reset();
      setImagePreview('');
      navigate('/movies');
    } catch (error) {
      console.error('Error saving movie:', error);
      toast.error(`Failed to ${id ? 'update' : 'create'} movie. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setImagePreview('');
    navigate(-1);
  };

  return (
    <PageLayout>
      <div className="relative z-10 min-h-screen flex flex-col px-6 pt-10 pb-32">
        <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-8 md:mb-12">
           {id ? 'Edit' : 'Create a new movie'}
          </h2>

          {
            isLoadingMovie && (
              <div className="flex items-center justify-center min-h-[300px]">
                <Loader size="lg" text="" />
              </div>
          )}
          
          {!isLoadingMovie && (<form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">

            <div className="flex flex-col md:hidden h-full">
              <div className="space-y-4 mb-6">
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: 'Title is required',
                    minLength: {
                      value: 1,
                      message: 'Title must be at least 1 character'
                    },
                    validate: (value) => value.trim().length > 0 || 'Title cannot be empty'
                  }}
                  render={({ field }) => (
                    <>
                      <Input
                        type="text"
                        placeholder="Title"
                        {...field}
                        required
                        className="bg-input h-[45px] text-base w-full"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                      )}
                    </>
                  )}
                />

                <Controller
                  name="publishingYear"
                  control={control}
                  rules={{
                    required: 'Publishing year is required',
                  }}
                  render={({ field }) => (
                    <>
                      <YearDropdown
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full max-w-[180px]"
                      />
                      {errors.publishingYear && (
                        <p className="text-red-500 text-sm mt-1">{errors.publishingYear.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <FileUpload
                value={imageFile}
                preview={imagePreview}
                onChange={handleFileChange}
                mobileClassName="flex-1 mb-6"
              />

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 h-12 text-base font-semibold"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading || isLoadingMovie}
                  className="flex-1 h-12 text-base font-semibold"
                >
                  {isLoading ? (id ? 'Updating...' : 'Creating...') : (id ? 'Update' : 'Submit')}
                </Button>
              </div>
            </div>

            {/* Desktop Layout  */}
            <div className="hidden md:grid md:grid-cols-[300px,1fr] lg:grid-cols-[350px,1fr] gap-12 lg:gap-16">
              
              {/* Left Column  */}
              <FileUpload
                value={imageFile}
                preview={imagePreview}
                onChange={handleFileChange}
              />

              {/* Right Column  */}
              <div className="flex flex-col justify-center space-y-5 max-w-sm">
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: 'Title is required',
                    minLength: {
                      value: 1,
                      message: 'Title must be at least 1 character'
                    },
                    validate: (value) => value.trim().length > 0 || 'Title cannot be empty'
                  }}
                  render={({ field }) => (
                    <>
                      <Input
                        type="text"
                        placeholder="Title"
                        {...field}
                        required
                        className="bg-input h-12 text-base"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                      )}
                    </>
                  )}
                />

                <Controller
                  name="publishingYear"
                  control={control}
                  rules={{
                    required: 'Publishing year is required',
                  }}
                  render={({ field }) => (
                    <>
                      <YearDropdown
                        value={field.value}
                        onChange={field.onChange}
                        className="max-w-[180px]"
                      />
                      {errors.publishingYear && (
                        <p className="text-red-500 text-sm mt-1">{errors.publishingYear.message}</p>
                      )}
                    </>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="h-12 px-6 text-base font-semibold"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading || isLoadingMovie}
                    className="h-12 px-8 text-base font-semibold"
                  >
                    {isLoading ? (id ? 'Updating...' : 'Creating...') : (id ? 'Update' : 'Submit')}
                  </Button>
                </div>
              </div>
            </div>
          </form>)}
        </div>
      </div>
    </PageLayout>
  );
};

export default MovieManager;