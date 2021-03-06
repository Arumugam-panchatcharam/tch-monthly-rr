const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/Vote");

const Pusher = require("pusher");

const keys = require("../config/keys");

var pusher = new Pusher({
  appId: keys.pusherAppId,
  key: keys.pusherKey,
  secret: keys.pusherSecret,
  cluster: keys.pusherCluster,
  encrypted: keys.pusherEncrypted
});


router.get("/", (req, res) => {
  Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post("/", (req, res) => {
  const newVote = {
    contrib: req.body.contrib,
    points: 1
  };
    
  new Vote(newVote).save().then(vote => {
    pusher.trigger("contrib-poll", "contrib-vote", {
      points: parseInt(vote.points),
      contirb: vote.contirb
    });

    return res.json({ success: true, message: "Thank you for voting" });
  });
});

router.post("/drop", (req, res) => {
    Vote.collection.drop();
    return res.json({ success: true, message: "All records Deleted successfully" });
});

module.exports = router;
