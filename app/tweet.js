const client = require('./client');
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
 "Friday", "Saturday"];
const d = new Date();
const data = 'nycasp'

client.get(`statuses/user_timeline.json?screen_name=${data}&count=1`, function(error, tweets, response) {
  if(error) throw error;

  if (tweets[0].text.indexOf('suspended') > 0) {
    
    client.post('statuses/update', { 
      status: `${weekdays[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDay()}: Alternate Side Parking rules are suspended #NYCASPS`},  
      function(error, tweet, response) {
        if(error) throw error;
        console.log('Parking is suspended. Tweet successfully sent to @nycasps');
      });
    } else {
      console.log('You have to move the damn car')
    }
  });
