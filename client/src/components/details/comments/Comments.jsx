
import { useState, useContext, useEffect } from "react";
import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { DataContext } from "../../../context/DataProvider";
import API from "../../../service/api";


//Components
import Comment from "./Comment";



const Container = styled(Box)`
  margin-top: 100px;
  display:flex;
  `

const Image = styled('img')({
  width: 50,
  height: 50,
  borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width:100%;
  margin: 0 20px;
  `;

const initialValues = {
  name: '',
  postId: '',
  comments: '',
  date: new Date()
}

const Comments = ({ post }) => {

  const url = 'https://static.thenounproject.com/png/12017-200.png';
  const [comment, setComment] = useState(initialValues);
  const { account } = useContext(DataContext);
  const [comments, setComments] = useState([])


  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComments(post._id);
      if (response?.isSuccess) {
        setComments(response.data)
      }
    };

    getData()
  }, [post])


  const handleChange = (e) => {
    setComment(
      {
        ...comment,
        name: account.username,
        postId: post._id,
        comments: e.target.value
      }
    )
  };

  const addComment = async (e) => {
    const response = await API.newComment(comment);
    if (response?.isSuccess) {
      setComment(initialValues);
    }
  }

  return (
    <Box>

      {/* wo box hoga jnha pe user apna comment enter kr skta hai. */}
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextArea minRows={5} placeholder="What's on your mind?..." value={Comment.comments} onChange={(e) => handleChange(e)} />
        <Button variant="contained" color="primary" size="medium" style={{ height: 40 }} onClick={(e) => addComment(e)}>POST</Button>
      </Container>

      {/* wo box hoga janha pe user user apna comment dekhega yani user ke comments ko diplay krwaunga. */}
      <Box>
        {
          comments && comments.length > 0 && comments.map(comment => (
            <Comment comment={comment} />
          ))
        }
      </Box>
    </Box>
  )
}

export default Comments;