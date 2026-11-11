import { Header, Stats, BarProgress } from '@components';

function App() {
  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col items-center justify-center gap-4">
      <Header />
      <Stats />
      <BarProgress />
    </div>
  );
}

export default App;
