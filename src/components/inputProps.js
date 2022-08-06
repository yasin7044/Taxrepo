const inputProps = {
  noDense: Boolean,
  noOutlined: Boolean,
  label: String,
  classes: {
    type: String,
    default: "",
  },
};

const inputFieldProps = {
  ...inputProps,
};

const inputSelectProps = {
  ...inputProps,
  noMapOptions: Boolean,
  noEmitValue: Boolean,
  useInput: Boolean,
  useFilter: Boolean,
  optionValue: {
    type: [String, Function],
    default: "value",
  },
  optionLabel: {
    type: [String, Function],
    default: "label",
  },
  options: {
    type: Array,
    default: () => [],
  },
};

export { inputProps, inputFieldProps, inputSelectProps };
