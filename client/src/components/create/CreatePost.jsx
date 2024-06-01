import { useState, useEffect, useContext } from 'react';

import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";
import { AddCircle as Add } from '@mui/icons-material';
// import { categories } from "../../constants/data";
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import API from '../../service/api';

const Container = styled(Box)`
  margin:50px 100px`

//agr hum style me html component ya html tag element pass kr rhe hain tb hme aese styling krni hoti hai.
const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover'

});

const StyledFormControl = styled(FormControl)`
  margin-top:10px;
  display:flex;
  flex-direction:row;
`;

//flex1 - pure screen pr lekr jayega, mtlb suitabe width lega apni.
const InputTextField = styled(InputBase)`
  flex:1;
  margin: 0px 30px;
  font-size: 25px;  
  `;

const TextArea = styled(TextareaAutosize)`
  width:100%;
  margin-top:50px;
  font-size:18px;
  border:none;
  &:focus-visible{
    outline:none;
  }
  `;

const InitialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
}


const CreatePost = () => {
  // const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  const [post, setPost] = useState(InitialPost);
  const [file, setFile] = useState('');
  const location = useLocation();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  const url = post.picture?.imageUrl ? post.picture?.imageUrl : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const getImage = async () => {
      // image ko store krne ke liye hme state bnaani pdegi.
      if (file) {
        const data = new FormData()//file ko formData se hi upload kraate hain hum hmesha
        data.append('name', file.name);
        data.append('file', file);
        console.log(data.get('name'));
        console.log(data.get('file'));
        console.log([...data.entries()])


        //API CALL for download the image in MONGODB
        const response = await API.uploadFile(data)
        post.picture = response.data;   //TODO,  isme image ka url daalna hai
      }
    }

    getImage();

    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;

    // }, [])   // empty array pass kiya hai mtlb mera useEffect sirf ek baar call hoga.
  }, [file])       //file ke change hone pr useEffect call hoga. mtlb jb v image change hogi tb tb ye useEffect call hoga.

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });

  }


  const savePost = async () => {
    let response = await API.createPost(post);
    if (response.isSuccess) {
      navigate('/');
    }
  }



  //*********************************** */
  // const handleFileUpload = (e) => {
  //   console.log("FILEEEEEEEEEEEEEE", e.target.files[0]);
  //   setFile(e.target.files[0])
  // }

  return (
    <Container>
      <Image src={url} alt="banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>

        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
        {/* <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e)} /> */}

        <InputTextField placeholder="Title.." onChange={(e) => handleChange(e)} name='title' />
        <Button variant="contained" onClick={() => savePost()}>Publish</Button>
      </StyledFormControl>

      <TextArea minRows={5} placeholder="Tell Your Story..." onChange={(e) => handleChange(e)} name='description' />
    </Container>
  )
}

export default CreatePost;