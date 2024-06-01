
import Post from "../model/post.js"

export const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();
    return response.status(200).json('Post saved successfully');
  } catch (error) {
    return response.status(500).json(error);
  }
}

export const getAllPosts = async (request, response) => {
  let category = request.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category })
    } else {
      posts = await Post.find({})  // empty object ka matlab ki mongodb se saara ka saara data lekr aayega...
    }
    return response.status(200).json({
      // msg: 'Posts has been fetched', posts
      posts
    })

  } catch (error) {
    return response.status(500).json({ msg: error.message })
  }
};


export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request?.params?.id);
    // return response.status(200).json({
    //   msg: 'Post Details has been fetched',
    //   post
    // })
    return response.status(200).json(post)
  } catch (error) {
    return response.status(500).json({
      msg: error.message
    })
  }
}


export const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request?.params?.id);
    if (!post) {
      return response.status(404).json({ msg: 'Post not found' });
    }

    const updatedData = await Post.findByIdAndUpdate(request?.params?.id, { $set: request.body })  //there are 2 method for update - 1. $set - array ke andar agr kisi object ko replace krna hai to 2. addToSet - agr kisi array e anadar kisi object ko append krna hai to
    return response.status(200).json({ msg: 'Post has been updated', updatedData })
  } catch (error) {
    return response.status(500).json({ msg: error.message })
  }
};


export const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request?.params?.id);
    if (!post) {
      return response.status(404).json({ msg: 'Post not found' })
    }

    const deletedData = await post.deleteOne();
    return response.status(200).json({ msg: 'Post has been deleted', deletedData })

  } catch (error) {
    return response.status(500).json({ msg: error.message })
  }
}