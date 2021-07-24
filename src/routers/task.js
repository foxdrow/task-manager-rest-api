const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

/*------------------ READ TASK ------------------*/

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

/*--------------- READ ALL TASKS ---------------*/

router.get("/tasks", auth, async (req, res) => {
  const match = {
    completed: false,
  };

  if (req.query.completed) match.completed = req.query.completed === "true";

  console.log(match);

  try {
    const tasks = await Task.find({
      owner: req.user._id,
      completed: match.completed,
    });
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

/*----------------- CREATE TASK -----------------*/

router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);

  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send();
  }
});

/*------------------ UPDATE TASK -----------------*/

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

/*------------------ DELETE TASK ------------------*/

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
