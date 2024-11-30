const extractFieldNameFromError = (error) => {
  if (error.detail) {
    // Use a regex to extract the field name between the parentheses
    const match = error.detail.match(/\((.*?)\)/);
    if (match && match[1]) {
      return match[1]; // Return the field name (e.g., "username")
    }
  }
  return null; // Return null if no field name is found
};

module.exports = extractFieldNameFromError;
