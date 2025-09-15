// routes/dogRoutes.js
const router = require("express").Router();
const { authRequired } = require("../middlewares/auth");
const {
  registerDog,
  adoptDog,
  removeDog,
  listMyRegisteredDogs,
  listMyAdoptedDogs,
} = require("../controllers/dogController");

// (3) Register dog
router.post("/", authRequired, registerDog);

// (4) Adopt dog by id
router.post("/:id/adopt", authRequired, adoptDog);

// (5) Remove dog (owner only, if not adopted)
router.delete("/:id", authRequired, removeDog);

// (6) List my registered dogs
router.get("/mine", authRequired, listMyRegisteredDogs);

// (7) List my adopted dogs
router.get("/adopted", authRequired, listMyAdoptedDogs);

module.exports = router;
