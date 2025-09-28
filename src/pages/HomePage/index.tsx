import Button from '@/components/ui/Button';

const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Button variant={'secondary'} size={'medium'}>
        Переглянути
      </Button>
    </div>
  );
};

export default HomePage;
