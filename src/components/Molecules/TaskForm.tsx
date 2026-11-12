import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type TaskFormType, taskSchema } from '@/models/schema';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { Button, Input } from '@components';

export const TaskForm = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-2">
      <Input
        name="task"
        control={control}
        label="Tarea"
        type="text"
        error={errors.task}
      />

      <Button
        type="submit"
        ariaLabel="agregar tarea"
        className="bg-primary hover:bg-primary-hover p-3"
      >
        <HiOutlinePlusSm size={20} />
      </Button>
    </form>
  );
};
