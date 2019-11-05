export default input => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  var day = input.getDate();
  var monthIndex = input.getMonth();
  var year = input.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}