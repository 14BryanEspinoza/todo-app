import { filtersContent } from '@/utils';
import { Button } from '@components';

const styleBase = 'items-center text-sm font-bold';

export const Filters = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {filtersContent.map((item) => {
        return (
          <Button
            key={item.label}
            type="button"
            onClick={() => {}}
            className={`${styleBase} ${item.colorText}`}
          >
            <item.icon className="size-4" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};
