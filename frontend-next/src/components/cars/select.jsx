export default function Select({ labelName, optionList, defaultValue }) {
  return (
    <label htmlFor={labelName}>
      Pick your favorite {labelName}
      <select
        name={labelName}
        id={labelName}
        className="bg-white border rounded-md p-2 font-mono "
        defaultValue={defaultValue}
      >
        {optionList.map((value, index) => {
          return (
            <option value={value} key={value + index}>
              {value}
            </option>
          );
        })}
      </select>
    </label>
  );
}
