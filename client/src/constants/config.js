// API_NOTIFICATION_MESSAGES


export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: 'Loading.... ',
    message: 'Data is being loaded, Please wait'
  },

  success: {
    title: 'Success',
    message: 'Data successfully loaded'
  },


  responseFailure: {
    title: 'Error',
    message: 'An error occured while fetching response from the server. Please try again.'
  },

  requestFailure: {
    title: 'Error',
    message: 'An error occured while parsing request data'
  },

  networkError: {
    title: 'Error',
    message: 'Unable to connect with the server. Please check internet connectivity and try again later'
  }
}


//API SERVICE CALL - jitne v hmaare service urls honge wo saare ynha pe honge
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: '/', method:'POST/GET/PUT/DELETE', params: true/false, query: true/false }

export const SERVICE_URLS = {
  userSignup: { url: 'http://localhost:8000/signup', method: 'POST' },
  forgottenPassword: { url: 'http://localhost:8000/forgottenPassword', method: 'POST' },
  userLogin: { url: 'http://localhost:8000/login', method: 'POST' },
  uploadFile: {
    url: 'http://localhost:8000/file/upload', method: 'POST', headers: {
      "content-type": "multipart/form-data",
    },
  },

  createPost: { url: 'http://localhost:8000/create', method: 'POST' },
  getAllPosts: { url: 'http://localhost:8000/posts', method: 'GET', params: true },
  getPostById: { url: 'http://localhost:8000/post', method: 'GET', query: true },
  updatePost: { url: 'http://localhost:8000/update', method: 'PUT', query: true },
  deletePost: { url: 'http://localhost:8000/delete', method: 'DELETE', query: true },
  newComment: { url: 'http://localhost:8000/comment/new', method: 'POST' },
  getAllComments: { url: 'http://localhost:8000/comments', method: 'GET', query: true }
}


// export const SERVICE_URLS = {
//   userSignup: { url: '/signup', method: 'POST' },
//   forgottenPassword: { url: '/forgottenPassword', method: 'POST' },
//   userLogin: { url: '/login', method: 'POST' },
//   uploadFile: {
//     url: '/file/upload', method: 'POST', headers: {
//       "content-type": "multipart/form-data",
//     },
//   },

//   createPost: { url: '/create', method: 'POST' },
//   getAllPosts: { url: '/posts', method: 'GET', params: true },
//   getPostById: { url: '/post', method: 'GET', query: true },
//   updatePost: { url: '/update', method: 'PUT', query: true },
//   deletePost: { url: '/delete', method: 'DELETE', query: true },
// }