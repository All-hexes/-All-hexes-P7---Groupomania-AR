const Post = require('../models/post');
const fs = require('fs');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
};

exports.writePost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    postObject._userId;
    const post = new Post({
        ...postObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    post.save()
        .then(() => res.status(201).json({ message: "Commentaire posté avec succès !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId !== req.auth.userId) {
                res.status(401).json({
                    error: new Error(
                        "Vous n'êtes pas le propriétaire de ce commentaire."
                    ),
                });
            }
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {

                const postObject = req.file
                    ? {
                        ...JSON.parse(req.body.post),
                        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
                            }`,
                    }
                    :
                    { ...req.body };
                Post.updateOne(
                    { _id: req.params.id },
                    { ...postObject, _id: req.params.id }
                )
                    .then(() => res.status(200).json({ message: "Commentaire mise à jour !" }))
                    .catch((error) => res.status(400).json({ error }));
            });
        });
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then((post) => {
        if (!post) {
            res.status(404).json({ error: new Error("Ce commentaire n'existe pas") });
        }
        if (post.userId !== req.auth.userId) {
            res.status(401).json({
                error: new Error(
                    "Vous n'êtes pas le propriétaire de ce commentaire."
                ),
            });
        }
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
                .catch((error) => res.status(400).json({ error }));
        });
    });
};

exports.likePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    error: new Error("Ce commentaire n'existe pas"),
                });
            };

            const userLikeIndex = post.usersLiked.findIndex(
                (userId) => userId == req.body.userId
            );
            const userDislikeIndex = post.usersDisliked.findIndex(
                (userId) => userId == req.body.userId
            );
            if (req.body.like === 1) {
                if (userLikeIndex !== -1) {
                    return res.status(500).json({
                        error: new Error("L'utilisateur a déjà liké ce commentaire"),
                    });
                }
                if (userDislikeIndex !== -1) {
                    post.usersDisliked.splice(userDislikeIndex, 1);
                    post.dislikes--;
                }
                post.usersLiked.push(req.body.userId);
                post.likes++;
            }
            if (req.body.like === -1) {
                if (userDislikeIndex !== -1) {
                    return res.status(500).json({
                        error: new Error("L'utilisateur a déjà disliké ce commentaire"),
                    });
                }
                if (userLikeIndex !== -1) {
                    post.usersLiked.splice(userLikeIndex, 1);
                    post.likes--;
                }
                post.usersDisliked.push(req.body.userId);
                post.dislikes++;
            }
            if (req.body.like === 0) {
                if (userDislikeIndex !== -1) {
                    post.usersDisliked.splice(userDislikeIndex, 1);
                    post.dislikes--;
                }
                else if (userLikeIndex !== -1) {
                    post.usersLiked.splice(userLikeIndex, 1);
                    post.likes--;
                }
            }
            Post.updateOne({ _id: req.params.id }, post).then(() => {
                res.status(200).json({ message: "Avis enregistré !" });
            });
        });
};