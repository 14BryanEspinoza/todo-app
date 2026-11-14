import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type TaskFormType, taskSchema } from '@/models/schema';
import { Input } from '@components';

export const SearchBar = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormType>({
    resolver: zodResolver(taskSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<TaskFormType> = (data) => {
    return data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="task"
        control={control}
        label="Tarea"
        type="text"
        error={errors.task}
        placeholder="Buscar tarea"
      />
    </form>
  );
};
