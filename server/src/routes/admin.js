const { Router } = require("express");
const router = Router();

const {
  getAdmins,
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admin.controller");

router.route("/").get(getAdmins);
router.route("/").post(createAdmin);

router.route("/:id").get(getAdmin);
router.route("/:id").delete(deleteAdmin);
router.route("/:id").put(updateAdmin);

module.exports = router;
