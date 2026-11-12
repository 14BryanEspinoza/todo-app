import { filtersContent } from '@/utils';
import { Button } from '@components';

const styleBase =
  'border-border rounded-xl border bg-transparent px-4 py-2 text-xs font-bold hover:bg-bg/50';

export const Filters = () => {
  return (
    <div className="flex justify-center gap-3 px-2 py-4">
      {filtersContent.map((item) => {
        return (
          <Button
            type="button"
            ariaLabel={item.ariaLabel}
            className={`${styleBase} ${item.colorText}`}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};
