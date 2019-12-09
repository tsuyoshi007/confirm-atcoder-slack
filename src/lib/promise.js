const cheerio = require("cheerio");
const https = require("https");
const Datastore = require("nedb");
const nedb = new Datastore();

/**
 *
 * @param {JSON} document
 */
const nedbInsert = document => {
  return new Promise((resolve, reject) => {
    nedb.insert(document, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};

/**
 *
 * @param {JSON} query
 */
const nedbFindOne = query => {
  return new Promise((resolve, reject) => {
    nedb.findOne(query, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};

/**
 * get html of atcoder_user's profile
 * @param {String} user
 */
const getatCoderProfilePromise = user => {
  return new Promise((resolve, reject) => {
    https
      .get(`https://atcoder.jp/users/${user}/`, resp => {
        let data = "";
        resp.on("data", chunk => {
          data += chunk;
        });
        resp.on("end", () => {
          resolve(data);
        });
      })
      .on("error", err => {
        reject(err);
      });
  });
};

/**
 * get token from atcoder_user's affiliation
 * @param {String} user
 */
const getTokenFromAffiliation = user => {
  return new Promise(async (resolve, reject) => {
    const html = await getatCoderProfilePromise(user).catch(err => {
      reject(err);
    });
    const $ = cheerio.load(html);

    atcoder_affiliation = $(".break-all").text();

    if (atcoder_affiliation) {
      const token_in_parentheses = atcoder_affiliation.match(/\(\w{22}\)/g)[0];
      const token = token_in_parentheses.split(/\(|\)/)[1];
      resolve(token);
    } else {
      resolve(false);
    }
  });
};

module.exports = {
  nedbInsert: nedbInsert,
  nedbFindOne: nedbFindOne,
  getTokenFromAffiliation: getTokenFromAffiliation
};
