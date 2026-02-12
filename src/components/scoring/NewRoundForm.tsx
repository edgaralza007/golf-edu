import { useState } from 'react';
import { Button } from '../ui';

interface NewRoundData {
  date: string;
  courseName: string;
  holes: 9 | 18;
  coursePar: number;
}

interface NewRoundFormProps {
  onStart: (data: NewRoundData) => void;
  onCancel: () => void;
}

export function NewRoundForm({ onStart, onCancel }: NewRoundFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [courseName, setCourseName] = useState('');
  const [holes, setHoles] = useState<9 | 18>(18);
  const [coursePar, setCoursePar] = useState(72);

  const handleHolesChange = (h: 9 | 18) => {
    setHoles(h);
    setCoursePar(h === 9 ? 36 : 72);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim()) return;
    onStart({ date, courseName: courseName.trim(), holes, coursePar });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="e.g. Pine Valley Golf Club"
          className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Holes</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleHolesChange(9)}
            className={`flex-1 h-11 rounded-lg font-medium text-sm transition-colors ${
              holes === 9
                ? 'bg-green-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            9 Holes
          </button>
          <button
            type="button"
            onClick={() => handleHolesChange(18)}
            className={`flex-1 h-11 rounded-lg font-medium text-sm transition-colors ${
              holes === 18
                ? 'bg-green-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            18 Holes
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course Par</label>
        <input
          type="number"
          min={27}
          max={80}
          value={coursePar}
          onChange={(e) => setCoursePar(Number(e.target.value) || 72)}
          className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={!courseName.trim()}>
          Start Round
        </Button>
      </div>
    </form>
  );
}
