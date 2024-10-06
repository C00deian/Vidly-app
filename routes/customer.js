const express = require("express");
const router = express.Router();
const auth = require("../middleware/Authentication");
const {
  customers,
  createCustomer,
  updateCustomer,
  getCustomer,
  deleteCustomer,
} = require("../controller/customer");

router.get("/", auth, customers);
router.post("/create-customer", auth, createCustomer);
router.put("/update-customer/:id", auth, updateCustomer);
router.get("/:id", auth, getCustomer);
router.delete("/:id", auth, deleteCustomer);

module.exports = router;
