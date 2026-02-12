import { SearchInput } from '../ui';

interface GlossarySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function GlossarySearch({ value, onChange }: GlossarySearchProps) {
  return (
    <SearchInput
      value={value}
      placeholder="Search terms, definitions, or categories..."
      onSearch={onChange}
      className="w-full"
    />
  );
}
