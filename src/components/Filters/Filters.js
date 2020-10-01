import React from 'react';
import { useAsyncDebounce } from 'react-table';

export const Filter = ({ column }) => (
  <span style={{ marginTop: 5 }}>{column.canFilter && column.render('Filter')}</span>
);

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => (
  <input
    value={filterValue || ''}
    onChange={(e) => {
      setFilter(e.target.value || undefined);
    }}
    placeholder={`search (${length}) ...`}
  />
);

export const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(() => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Player Search"
        style={{
          border: '0',
        }}
      />
    </span>
  );
};

export const SelectColumnFilter = ({
  column: {
    filterValue, setFilter, preFilteredRows, id,
  },
}) => {
  const options = React.useMemo(() => {
    // eslint-disable-next-line no-shadow
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      id="custom-select"
      type="select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">POS</option>
      <option value="">ALL</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
