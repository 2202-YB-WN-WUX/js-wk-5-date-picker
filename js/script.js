// JQuery general function that runs when the page has loaded
$(function() {
// grab an HTML input name of birthday
// plug daterangepicker
  $('input[name="birthday"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10)
  })
})
;

const message = document.getElementById('message');
let valid;

$(function() {
  $('input[name="daterange"]').daterangepicker({
    showDropdowns: true,
    // blank by default
    autoUpdateInput: false,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10)
  })
  $('input[name="daterange"]').on('apply.daterangepicker',
  function(ev, picker) {
    // console.log("You clicked apply");
      let fullDate = $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));

      let start = picker.startDate.format('MM/DD/YYYY');
      let end = picker.endDate.format('MM/DD/YYYY');
      let daysSelected = datediff(parseDate(start), parseDate(end));
      // console.log(daysSelected);

      // work out the differece between two dates
      function parseDate(str) {
          var mdy = str.split('/');
          return new Date(mdy[2], mdy[0]-1, mdy[1]);
      }

      // this function here works out the difference between the Dates
      // using two arguments, the start date and the end date
      function datediff(first, second) {
          // Take the difference between the dates and divide by milliseconds per day.
          // Round to nearest whole number to deal with DST.
          return Math.round((second-first)/(1000*60*60*24));
      }
      let messageContent;
      // add in our own validation
      if (daysSelected < 3) {
        messageContent = `
        Please select at least 3 days.
        `
        valid = false;
      } else if (daysSelected > 16) {
        messageContent = `
        <span class="warning">Please select less than 16 days.</span>
        `
        valid = false;
      } else {
        messageContent = `
        <strong>Days selected: ${daysSelected} <i class="bi bi-check-square"></i></strong>
        `
        valid = true;
      }
      message.innerHTML = messageContent;
    }
  )
});

const submit = document.getElementById('submit-button');
submit.onclick = function() {
  if (valid == true) {
    alert("success");
  }
}

// Activity:
// ---------
// Get it so if you click submit and the days are valid (use a boolean)
// Make an alert saying "submitted successfully!"
