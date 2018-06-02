var request = require("./request.js");

test("test searchWord", done => {
  request.searchWord("haus", "de", "en", (error, response, body) => {
    expect(typeof body === 'string').toBe(true);

    var data = JSON.parse(body);
    expect("results" in data).toBe(true);
    expect(data.results[0].lexicalEntries[0].entries[0].senses[0].translations[0].text).toBe("house");

    done();
  });
});
