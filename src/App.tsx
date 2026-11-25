import { useState } from 'react';
import type { Task, TaskFilter, TaskId } from '@models';
import { AddTask, Aside, Footer, Header, TaskList } from '@components';

const template = "[grid-template-areas:'aside_main'_'aside_footer']";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [search, setSearch] = useState('');

  const normalizeSearch = search.trim().toLocaleLowerCase();

  const visibleTask = tasks
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter((task) => task.title.toLocaleLowerCase().includes(normalizeSearch));

  const toggleTask = (id: TaskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const addTasks = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (id: TaskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div
      className={`grid min-h-screen grid-cols-[auto_1fr] grid-rows-[1fr_auto] ${template}`}
    >
      <Aside
        tasks={tasks}
        filter={filter}
        onFilterChanged={setFilter}
        search={search}
        onSearchChange={setSearch}
        className="[grid-area:aside]"
      />

      <main className="m-4 min-w-0 [grid-area:main]">
        <Header />

        <AddTask onAdd={addTasks} />

        <TaskList
          tasks={visibleTask}
          onToggle={toggleTask}
          onRemove={removeTask}
        />
      </main>

      <Footer className="m-4 [grid-area:footer]" />
    </div>
  );
}

export default App;
