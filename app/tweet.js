const client = require('./client');

const  params = {screen_name: 'nycasps'};
client.post('statuses/update', { status: 'This is a test tweet written by nycasps' + ' #testing'},  function(error, tweet, response){
  if(error) throw error;

  console.log('✔  Tweet successfully sent to @nycasps');

});
