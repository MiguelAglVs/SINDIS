const { Router } = require("express");
const router = Router();

const {
  getAdmins,
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admin.controller");

router.route("/")
  .get(getAdmins)
  .post(createAdmin);

router.route("/:id")
    .get(getAdmin)
    .delete(deleteAdmin)
    .put(updateAdmin);

module.exports = router;
