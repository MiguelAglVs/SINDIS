const { Router } = require("express");

const {
	createContent,
	getContents,
	deleteContent,
} = require("../controller/content.controller");

const router = Router();

router.route("/image").post(createContent);
router.route("/image").get(getContents);
router.route("/image/:id").delete(deleteContent);

module.exports = router;
