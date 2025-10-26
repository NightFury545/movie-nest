import MovieFilter from '@/components/MovieFilter';

const MoviesPage = () => {
  return (
    <div style={{ height: '100vh', width: '100vh' }}>
      <div style={{ width: '270px', height: '100%' }}>
        <MovieFilter />
      </div>
    </div>
  );
};

export default MoviesPage;
