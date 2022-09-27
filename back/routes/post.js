const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.writePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;