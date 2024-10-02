const router = require("express").Router();
const { sayHello, pushToDB, fetchTasksFromDB, deleteTaskFromDB } = require("../controllers/mainController");

router.route("/").get(sayHello);
router.route("/push").post(pushToDB)
router.route("/fetch").get(fetchTasksFromDB);
router.route("/delete").post(deleteTaskFromDB)

module.exports = { router };
