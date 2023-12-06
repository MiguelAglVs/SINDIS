const { Router } = require("express");
const router = Router();

const {
  getAdmins,
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/user.controller");

router.route("/User").get(getAdmins);
router.route("/User").post(createAdmin);

router.route("/User/:id").get(getAdmin);
router.route("/User/:id").delete(deleteAdmin);
router.route("/User/:id").put(updateAdmin);

module.exports = router;
