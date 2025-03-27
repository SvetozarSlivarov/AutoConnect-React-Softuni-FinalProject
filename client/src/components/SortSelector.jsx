import React from "react";

const SortSelector = ({ sort, setSort }) => {
  return (
    <div className="ms-3 d-flex align-items-center gap-2">
      <label htmlFor="sort" className="mb-0">Sort by:</label>
      <div style={{ minWidth: "200px" }}>
        <select
          id="sort"
          className="form-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default (Newest)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-asc">Year: Oldest to Newest</option>
          <option value="year-desc">Year: Newest to Oldest</option>
          <option value="createdAt-asc">Publish Date: Oldest First</option>
          <option value="createdAt-desc">Publish Date: Newest First</option>
        </select>
      </div>
    </div>
  );
};

export default SortSelector;