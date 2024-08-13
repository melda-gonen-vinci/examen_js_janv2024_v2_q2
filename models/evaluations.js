/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const jsonDbPath2 = path.join(__dirname, '/../data/evaluations.json');
const jsonDbPath3 = path.join(__dirname, '/../data/quotes.json');

function createOneEvaluation(username, id, score) {
  const quotes = parse(jsonDbPath3);
  const evaluations = parse(jsonDbPath2);
  const evaluationFounded = evaluations.find(
    (evaluation) => evaluation.username === username && evaluation.idQuote === Number(id),
  );
  if (evaluationFounded) return undefined;

  const createdEvaluation = {
    idQuote: id,
    username,
    score,
  };

  evaluations.push(createdEvaluation);

  serialize(jsonDbPath2, evaluations);

  return createdEvaluation;
}
function validQuotes(id) {
  const quotes = parse(jsonDbPath3);
  return quotes[id];
}

module.exports = {
  createOneEvaluation,
  validQuotes,
};
