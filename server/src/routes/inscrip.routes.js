const { Router } = require("express");
const router = Router();

const {
	getInscrpciones,
	Inscpcion,
	deleteIncrip,
	updateInscrip,
} = require("../controller/Inscrip.controler");

router.route("/Inscritos").get(getInscrpciones);
router.route("/Inscritos").post(Inscpcion);
router.route("/Inscritos/:id").delete(deleteIncrip);
router.route("/Inscritos/:id").put(updateInscrip);

module.exports = router;
