import { Button } from "../button/button";

const inputClass = {
  secondary:
    "bg-amber-700 text-white hover:bg-amber-600 focus:bg-amber-600 border-transparent",
  primary:
    "bg-slate-100 text-white hover:bg-slate-200 focus:bg-slate-200 border-transparent",
  dark: "border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",
  "primary-search":
    "w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-auto focus:outline-none focus:shadow-outline",
  "secondary-search":
    "w-full px-3 py-2 leading-tight text-white bg-amber-700 border rounded shadow appearance-auto focus:outline-none focus:shadow-outline",
  "dark-search":
    "w-full px-3 py-2 leading-tight text-white bg-gray-700 border rounded shadow appearance-auto focus:outline-none focus:shadow-outline",
};

const labelClass = {
  dark: "block mb-2 text-sm font-medium text-white",
  primary: "block mb-2 text-sm font-medium text-slate-900",
  secondary: "block mb-2 text-sm font-medium text-amber-900",
};

export const Select = ({
  register,
  schema,
  name,
  label,
  required,
  variant = "primary",
  options,
  button,
  ...selectProps
}) => {
  const getSelectClass = () => {
    const className = inputClass[variant];
    return className || inputClass.primary;
  };

  const getLabelClass = () => {
    const className = labelClass[variant];
    return className || labelClass.primary;
  };

  return (
    <div>
      <label htmlFor={name} className={getLabelClass()}>
        {label}
      </label>
      <div className="flex items-center">
        <select
          {...register(name, schema[name])}
          key={name}
          name={name}
          id={name}
          required={required}
          className={`${getSelectClass()} ${button ? "mr-2" : ""}`}
          {...selectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {button && <Button {...button} />}
      </div>
    </div>
  );
};
