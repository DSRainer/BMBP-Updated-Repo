import { Button } from "@/components/ui/button";

interface FilterProps {
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
}

const Filter = ({ onFilterChange, onClearFilters }: FilterProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <div className="flex items-center space-x-2 mt-1">
            <input type="number" placeholder="Min" className="w-full border-gray-300 rounded-md shadow-sm" onChange={(e) => onFilterChange({ minPrice: e.target.value })} />
            <span>-</span>
            <input type="number" placeholder="Max" className="w-full border-gray-300 rounded-md shadow-sm" onChange={(e) => onFilterChange({ maxPrice: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <select className="w-full border-gray-300 rounded-md shadow-sm mt-1" onChange={(e) => onFilterChange({ rating: e.target.value }) }>
            <option value="">All</option>
            <option value="4.5">4.5+ stars</option>
            <option value="4">4+ stars</option>
            <option value="3">3+ stars</option>
          </select>
        </div>
        <Button onClick={onClearFilters} variant="outline" className="w-full">Clear Filters</Button>
      </div>
    </div>
  );
};

export default Filter;