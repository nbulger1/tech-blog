//helper function to format a date into a MM/DD/YYYY format
module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
};
