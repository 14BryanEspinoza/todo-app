import { useState } from 'react';
import type { Task } from '@models';
import { Aside } from '@components';

const tasksFake: Task[] = [
  {
    id: '1',
    title: 'Aprender useState',
    completed: true,
    createdAt: '2026-11-13T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Cablear el aside',
    completed: true,
    createdAt: '2026-11-13T11:00:00.000Z',
  },
  {
    id: '3',
    title: 'Entender props',
    completed: false,
    createdAt: '2026-11-13T12:00:00.000Z',
  },
];

function App() {
  const [tasks] = useState<Task[]>(tasksFake);

  return (
    <>
      <Aside tasks={tasks} />
    </>
  );
}

export default App;
