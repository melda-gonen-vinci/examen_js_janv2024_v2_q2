/* eslint-disable spaced-comment */
const express = require('express');
const { createOneEvaluation, validQuotes } = require('../models/evaluations');
const { authorize } = require('../utils/auths');

const router = express.Router();

/* Create an evaluation */

router.post('/', authorize, (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const username = req.user.username;
  const id = req?.body?.id?.length !== 0 ? req.body.id : undefined;
  const score = req?.body?.score?.length !== 0 ? req.body.score : undefined;

  if (validQuotes(id) === undefined) return res.sendStatus(404); // 404 Not Found
  if (!id || !score || score < 0 || score > 10) return res.sendStatus(400); // 400 Bad Request
  if (!username) return res.sendStatus(401); // 401 Unauthorized

  const createdEvaluation = createOneEvaluation(username, id, score);

  if (!createdEvaluation) return res.sendStatus(409); // 409 Conflict

  return res.json(createdEvaluation);
});

module.exports = router;
