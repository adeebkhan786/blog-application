import express from 'express';
const router = express.Router();
import { signupUser, loginUser, forgottenPassword } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost } from "../controller/post-controller.js";
import { authenticateToken } from '../controller/jwt-controller.js';

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgottenPassword", forgottenPassword);
router.post("/file/upload", upload.single('file'), uploadImage);
router.get("/file/:filename", getImage);
router.post("/create", authenticateToken, createPost);
router.get("/posts", authenticateToken, getAllPosts);
router.get("/post/:id", authenticateToken, getPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost)


export default router;