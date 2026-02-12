import { useState } from 'react';
import { Button } from '../ui';

interface RangeSessionFormProps {
  onSave: (session: { date: string; ballsHit: number; focusArea: string; notes: string }) => void;
  onCancel: () => void;
}

const focusAreas = ['Driver', 'Irons', 'Wedges', 'Putting', 'Chipping', 'Full Swing', 'Short Game', 'Mixed'];

export function RangeSessionForm({ onSave, onCancel }: RangeSessionFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [ballsHit, setBallsHit] = useState(50);
  const [focusArea, setFocusArea] = useState('Mixed');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ date, ballsHit, focusArea, notes: notes.trim() });
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Balls Hit</label>
        <input
          type="number"
          min={1}
          max={500}
          value={ballsHit}
          onChange={(e) => setBallsHit(Number(e.target.value) || 0)}
          className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Focus Area</label>
        <div className="flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => setFocusArea(area)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                focusArea === area
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you work on? Any breakthroughs?"
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Save Session
        </Button>
      </div>
    </form>
  );
}
