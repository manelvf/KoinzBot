const request = require('request');
const querystring = require('querystring');

const config = require('./config.json');


var showResponse = function(error, response, body) {
  if (error) {
    console.log(`Error ${error}`);
  }

  console.log(body);
};

var searchWord = function(word, sourceLanguage, targetLanguage, action) {

  var options = {
    url: `https://od-api.oxforddictionaries.com/api/v1/entries/\
${sourceLanguage}/${word}/translations=${targetLanguage}`,
    method: 'GET',
    headers: {
      'app_id': config.app_id,
      'app_key': config.app_key
    }
  };

  const req = request(options, action);
}

// searchWord("haus", "de", "en", showResponse);

module.exports = {
  searchWord: searchWord
}
