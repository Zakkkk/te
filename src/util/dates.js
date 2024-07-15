function getCurrentDateFormatted(date) {
  if (date == undefined || date == null)
    date = new Date().getTime();

  const newDate = new Date(date)

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(newDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

function getFormattedDateFromTime(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();

  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];

  const day = date.getDate();
  let daySuffix;
  if (day % 10 === 1 && day !== 11) {
      daySuffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
      daySuffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
      daySuffix = "rd";
  } else {
      daySuffix = "th";
  }

  return `${day}${daySuffix} ${month}, ${year}`;
}

export {
  getCurrentDateFormatted,
  getFormattedDateFromTime
}