function isValidDate(dateString) {
  const dateObject = new Date(dateString);
  return (
    !isNaN(dateObject) && dateObject.toISOString().slice(0, 10) === dateString
  );
}

module.exports = isValidDate;
