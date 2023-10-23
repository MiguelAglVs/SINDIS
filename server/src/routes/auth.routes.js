const { Router } = require("express");

const { authRequired } = require("../middlewares/validateToken");

const {
  register,
  login,
  logout,
  perfil,
} = require("../controller/auth.controller");

const router = Router();

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/logout").post(logout);

router.get("/perfil", authRequired, perfil);

module.exports = router;
