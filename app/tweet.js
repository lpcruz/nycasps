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

  const results = tweets[0].text;

  switch(true) {

    // Notify when parking rules are suspended the day of 

    case (results.indexOf('rules are suspended today') > 0): // Happens in the morning at 7:35AM
      client.post('statuses/update', {
        status: `${weekdays[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}: Alternate Side Parking rules are suspended today #NYCASPS`
        }, function(error, tweet, response) {
            if (error) throw new Error(error);
            console.log(`Successfully sent: ${tweet.text}. Tweet successfully sent to @nycasps`);
      });
      
      break;

    // Notify about tomorrow's suspension status  

    case (results.indexOf('rules will be suspended tomorrow') > 0): // Happens in the afternoon at 4:05PM
      client.post('statuses/update', { 
        status: `${weekdays[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate() + 1}: Alternate Side Parking rules are suspended tomorrow #NYCASPS`
        }, function(error, tweet, response) {
          if (error) throw new Error(error);
          console.log(`Successfully sent: ${tweet.text}. Tweet successfully sent to @nycasps`);
        });

      break;

    default:
     console.log('You have to move the damn car');
  }    
});
