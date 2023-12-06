const { Router } = require("express");

const {
	createDisc,
	getDisc,
	delDisc,
	updateDisc
} = require("../controller/discap.controller");

const router = Router();

router.route("/Discapacidades").post(createDisc);
router.route("/Discapacidades").get(getDisc);
router.route("/Discapacidades/:id").delete(delDisc);
router.route("/Discapacidades/:id").put(updateDisc);

module.exports = router;
