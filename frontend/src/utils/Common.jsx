// utils/Common.js
export const validateString = (value) => {
  if (!value || value.trim() === "") {
    return "This field is required";
  }
  return null;
};

export const validateNumber = (value) => {
  if (isNaN(value) || value <= 0) {
    return "Please enter a valid number";
  }
  return null;
};
