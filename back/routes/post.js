const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getPosts);
router.get("/:id", auth, sauceCtrl.getOnePost);
router.post('/', auth, multer, sauceCtrl.writePost);
router.put("/:id", auth, multer, sauceCtrl.modifyPost);
router.delete("/:id", auth, sauceCtrl.deletePost);
router.post("/:id/like", auth, sauceCtrl.likePost);

module.exports = router;