// controllers/dogController.js
const Dog = require("../models/Dog");

// (3) Register a dog (auth required)
exports.registerDog = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description)
      return res
        .status(400)
        .json({ error: "name and description are required" });

    const dog = await Dog.create({ name, description, owner: req.user.id });
    return res.status(201).json(dog);
  } catch (err) {
    next(err);
  }
};

// (4) Adopt a dog (auth required)
exports.adoptDog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body; // thank-you message to original owner

    const dog = await Dog.findById(id);
    if (!dog) return res.status(404).json({ error: "dog not found" });

    if (dog.status === "adopted")
      return res.status(409).json({ error: "dog already adopted" });

    if (String(dog.owner) === req.user.id)
      return res
        .status(403)
        .json({ error: "owners cannot adopt their own dogs" });

    dog.status = "adopted";
    dog.adoptedBy = req.user.id;
    dog.adoptedAt = new Date();
    dog.adoptMessageFromAdopter = message || null;

    await dog.save();

    return res.json({ message: "adoption successful", dog });
  } catch (err) {
    next(err);
  }
};

// (5) Remove a dog (auth + owner only, not adopted)
exports.removeDog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findById(id);
    if (!dog) return res.status(404).json({ error: "dog not found" });

    if (String(dog.owner) !== req.user.id)
      return res
        .status(403)
        .json({ error: "you can only remove your own dog" });

    if (dog.status === "adopted")
      return res
        .status(409)
        .json({ error: "cannot remove a dog that has been adopted" });

    await dog.deleteOne();
    return res.json({ message: "dog removed" });
  } catch (err) {
    next(err);
  }
};

// (6) List my registered dogs (filter by status + pagination)
exports.listMyRegisteredDogs = async (req, res, next) => {
  try {
    const { status } = req.query; // optional: 'available' | 'adopted'
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "10", 10), 1),
      100
    );
    const skip = (page - 1) * limit;

    const q = { owner: req.user.id };
    if (status) q.status = status;

    const [items, total] = await Promise.all([
      Dog.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Dog.countDocuments(q),
    ]);

    return res.json({ page, limit, total, items });
  } catch (err) {
    next(err);
  }
};

// (7) List dogs I adopted (pagination)
exports.listMyAdoptedDogs = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "10", 10), 1),
      100
    );
    const skip = (page - 1) * limit;

    const q = { adoptedBy: req.user.id };

    const [items, total] = await Promise.all([
      Dog.find(q).sort({ adoptedAt: -1 }).skip(skip).limit(limit),
      Dog.countDocuments(q),
    ]);

    return res.json({ page, limit, total, items });
  } catch (err) {
    next(err);
  }
};
