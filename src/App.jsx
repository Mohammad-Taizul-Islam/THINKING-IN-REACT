import { useState } from "react";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
function ProductTable({ products, filterText, isStockedOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (isStockedOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Price</th>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
function SearchBar({
  filterText,
  isStockedOnly,
  onFilterTextChange,
  onIsStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search.."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isStockedOnly}
          onChange={(e) => onIsStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [isStockedOnly, setIsStockedOnly] = useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        isStockedOnly={isStockedOnly}
        onFilterTextChange={setFilterText}
        onIsStockOnlyChange={setIsStockedOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        isStockedOnly={isStockedOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

export default App;
