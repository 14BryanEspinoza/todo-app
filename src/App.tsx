import { Header, Stats, BarProgress, Footer } from '@components';

function App() {
  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col items-center justify-center gap-4">
      <Header />
      <Stats />
      <BarProgress />
      <Footer />
    </div>
  );
}

export default App;
