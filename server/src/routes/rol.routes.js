const { Router } = require("express");

const {
	getRoles,
	createRol,
} = require("../controller/rol.controller");

const router = Router();

router.route("/roles").post(createRol);
router.route("/roles").get(getRoles);

module.exports = router;
