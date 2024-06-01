import { Box, Typography, styled } from "@mui/material";
import { addEllipsis } from "../../../utils/common-utils.js";
import { useSearchParams, Link } from 'react-router-dom'



//Box (poore container) ki styling krne ke liye...
const Container = styled(Box)`
  border:1px solid #d3cede;
  border-radius:10px;
  margin:10px;
  height: 350px;
  display:flex;
  align-items:center;
  flex-direction:column;
  & > p{
    padding: 0 5px 5px 5px;
  }`;


//Image ki styling krne ke liye...
const Image = styled('img')({
  width: '100%',
  borderRadius: '10px 10px 0 0',
  objectFit: 'cover',   //agar image ka size upar niche ho gya to objectFit krna hota hai.
  height: '150px'
})


//categories ki styling krne ke liye...
const Text = styled(Typography)`
  color:#878787;
  font-size: 12px;
  `

//Title ki styling krne ke liye..
const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  `;

//Description ko styling krne ke liye.
// display:flex;
// align-items:center;
// justify-content:center;
const Details = styled(Typography)`
  font-size:14px;
  word-break: break-word;   //ye hmaare word ko break krta hai aur next line me move krta hai jisse ki container ke baahar na jaaye.
  
  `

const Post = ({ post }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  // const url = post.picture.imageUrl ? post.picture.imageUrl : category == 'Sports' ? 'https://images.app.goo.gl/GtLRGo51umegVQEe9' : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
  const url = post.picture.imageUrl ? post.picture.imageUrl : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
  return (
    <Container>
      <Image src={url} alt="blog" />
      <Text>{post.categories}</Text>
      <Heading>{addEllipsis(post.title, 20)}</Heading>
      <Text>{post.username}</Text>
      <Details>{addEllipsis(post.description, 100)}</Details>
    </Container>
  )
}

export default Post;