// Variable Declaration




// API Database grabbed


  var requestURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={af9e5eb7dac10eb6ccfc9dd6c514a610}"


  fetch(requestURL)
    .then(res => console.log(res))
  

