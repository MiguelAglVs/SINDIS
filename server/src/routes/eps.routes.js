const { Router } = require("express");

const {
  createEps,
  getEps,
  delEps,
  updateEps,
} = require("../controller/eps.controller");

const router = Router();

router.route("/eps").post(createEps);
router.route("/eps").get(getEps);
router.route("/eps/:id").delete(delEps);
router.route("/eps/:id").put(updateEps);

module.exports = router;
