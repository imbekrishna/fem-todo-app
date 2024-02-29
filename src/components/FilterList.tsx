type FilterListProps = {
  setFilter: (e: React.MouseEvent) => void;
  activeTab: string;
  classList?: string[];
};

const FilterList = ({ classList, activeTab, setFilter }: FilterListProps) => {
  return (
    <div className={`filter ${classList?.join(' ')}`} onClick={setFilter}>
      <span
        role="button"
        className={`asButton ${activeTab === 'all' ? 'active' : ''}`}
        id="all"
      >
        All
      </span>
      <span
        role="button"
        className={`asButton ${activeTab === 'active' ? 'active' : ''}`}
        id="active"
      >
        Active
      </span>
      <span
        role="button"
        className={`asButton ${activeTab === 'completed' ? 'active' : ''}`}
        id="completed"
      >
        Completed
      </span>
    </div>
  );
};

export default FilterList;
