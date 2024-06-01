
import { useEffect, useState, useContext } from "react"
import { Box, styled, Typography } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { useParams, Link, useNavigate } from "react-router-dom";  //ye ek custom hook hai iske andar se hme id nikalni hai
import API from "../../service/api";
import { DataContext } from "../../context/DataProvider"


//Responsive bnaane ke liye hum "theme" ka use krte hain...
const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {   // agar meri website medium screen se below jayegi tb margin 0 kr dega
    margin: 0
  }
}))



const Image = styled(`img`)({
  width: '100%',
  height: '50vh',
  objectFit: 'cover'   //ye important hai...objectFit krne se image shi ho jati hai
});

const Heading = styled(Typography)`
  font-size:38px;
  font-weight:600;
  text-align:center;
  margin: 50px 0 0;
  word-break: break-word;`


const EditIcon = styled(Edit)`
  margin:5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;`

const DeleteIcon = styled(Delete)`
  margin:5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;`

// 
// flex-direction:column;
// align-items:center
const Author = styled(Box)`
    color: #878787;
    margin:20px 0;
    display:flex;
   `;

const Description = styled(Typography)`
    word-break:break-word;`

const DetailView = () => {

  const [post, setPost] = useState({});
  const { id } = useParams();   //url ke parameters se id ko nikaal lega.

  const { account } = useContext(DataContext);
  const navigate = useNavigate()

  const url = post?.picture?.imageUrl ? post?.picture?.imageUrl : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  // ab hme yanha pe api call krni hai use hum useEffect ke andar use krnge.
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response?.data);
      }
    };

    fetchData();
  }, []);

  const deleteBlog = async () => {
    const response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate('/');
    }
  }
  return (
    <Container>
      <Image src={url} alt='blog' />

      <Box style={{ float: 'right' }}>   {/* float: right krne se ye edit aur delete dono right side me chle jaaye. */}
        {
          account.username === post.username &&
          <>
            <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
            <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => deleteBlog()} />
          </>
        }
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Typography>Author: <Box component="span" style={{ fontWeight: '600' }}>{post.username}</Box></Typography>    {/* aesa krne se wo hme div nhi dega balki span dega jisse hum ek hi line me likh skte hain. */}
        <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>

      <Description>{post.description}</Description>
    </Container>
  )
}

export default DetailView;