'use client';

import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-lg border-2 p-4
        flex flex-col items-center justify-center gap-3
        hover:border-black transition cursor-pointer
        ${
          selected
            ? 'border-neutral-900 text-neutral-900'
            : 'border-neutral-200 text-neutral-400'
        }
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;