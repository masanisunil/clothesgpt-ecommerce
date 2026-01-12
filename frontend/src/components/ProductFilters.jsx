export default function ProductFilters({
  search,
  setSearch,
  sort,
  setSort,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search for products, Brands and More...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border px-4 py-3 text-sm outline-none bg-[var(--card)]"
      />

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border px-4 py-3 text-sm bg-[var(--card)]"
      >
        <option value="">Sort By</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
      </select>
    </div>
  );
}
