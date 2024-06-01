
import { useEffect, useState } from "react";
import API from "../../../service/api";
import { Box, Grid } from '@mui/material'
import Post from "./Post"
import { useSearchParams, Link } from 'react-router-dom'  //ye ek custom hook hai jiska use url se search params ko nikalne me use hota hai.s


const Posts = () => {

  const [posts, setPosts] = useState();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  // land krte hi useEffect call hota hai qki component didMount me useEffect call hota hai.
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getAllPosts({ category: category || '' });
      if (response?.isSuccess) {
        setPosts(response?.data?.posts);
      }
    };

    fetchData()
  }, [category])


  return (
    <>
      {
        posts && posts.length > 0
          ? posts.map(post =>

            //large screen me 3 hisso me aaye, small screen me 4 hisso me aaye aur extra small screen me 12 hisso me aaye.
            <Grid item lg={3} sm={4} xs={12}>
              <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Post key={post._id} post={post}></Post>
              </Link>
            </Grid>
          )
          : <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}> No Posts Available To Display...</Box>
      }

    </>
  )
}

export default Posts;