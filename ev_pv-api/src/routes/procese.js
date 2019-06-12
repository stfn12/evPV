/* eslint-disable no-underscore-dangle */
import express from "express";
import _ from "lodash";
import Pv from "../models/Proces";
import parseErrors from "../parseError";

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.query.name !== undefined) {
    await Pv.find({ contravenient: { "$regex": req.query.name, "$options": "i" }, ascuns: { $ne: 1 } }).exec()
      .then(procese => res.json({ procese }))
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  }
  else if (req.query.from === undefined || _.isEmpty(req.query)) {
    await Pv.find({ ascuns: { $ne: 1 } }).sort({ data_proces: -1, numar: 1 }).exec()
      .then(procese => res.json({ procese }))
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  }
  else if (req.query.from !== "undefined" || req.query.from !== null) {
    await Pv.find({ data_proces: { $gte: req.query.from, $lte: req.query.to }, ascuns: { $ne: 1 } })
      .sort({ data_proces: -1, numar: 1 }).exec()
      .then(procese => res.json({ procese }))
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  }
});

router.post("/", async (req, res) => {
  await Pv.create(req.body.proces)
    .then(proces => res.json({ proces }))
    .catch(err => res.status(400).json({ errors: { global: "Serie si numar existente" } }));
});

router.put("/:id", async (req, res) => {
  await Pv.findOneAndUpdate({ _id: req.body.proces._id }, req.body.proces)
    .then(() => Pv.findOne({ _id: req.body.proces._id })
      .then(proces => res.json({ proces })))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.delete("/:id", async (req, res) => {
  await Pv.findOneAndUpdate({ _id: req.params.id }, { ascuns: 1 })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;