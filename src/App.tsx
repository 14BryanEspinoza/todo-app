import {
  Header,
  Stats,
  BarProgress,
  TaskForm,
  Footer,
  Filters,
} from '@components';

function App() {
  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col items-center justify-center gap-4">
      <Header />
      <Stats />
      <BarProgress />
      <div className="border-border bg-surface w-full rounded-xl border p-4">
        <TaskForm />
        <Filters />
      </div>
      <Footer />
    </div>
  );
}

export default App;
