const { Router } = require("express");

const {
	createDiag,
	getDiag,
	delDiag,
	updateDiag
} = require("../controller/diagn.controler");

const router = Router();

router.route("/Diagnosticos").post(createDiag);
router.route("/Diagnosticos").get(getDiag);
router.route("/Diagnosticos/:id").delete(delDiag);
router.route("/Diagnosticos/:id").put(updateDiag);

module.exports = router;
