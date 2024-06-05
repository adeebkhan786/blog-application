import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email, LinkedIn } from '@mui/icons-material';


// https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg
// https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress
const Banner = styled(Box)`
    background: url(https://media.licdn.com/dms/image/C4D12AQEX5XX6WPbFvQ/article-cover_image-shrink_600_2000/0/1520135991433?e=2147483647&v=beta&t=ydPXI6r5u73rPTEB9vdh0V2hRyKz8NTKgMUk7AOOuBE) center/cover repeat-x #000;  
    width: 100%;
    height: 50vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column
  
`;

// background-position: left 0px bottom 0px;
// background-size: cover;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

  return (
    <Box>
      <Banner />
      <Wrapper>
        {/* <Typography variant="h3">Code for Interview</Typography> */}
        <Typography variant="h3">MyBlogDiary - Adeeb Khan</Typography>
        <Text variant="h5">Welcome to our blog application, where you can share your thoughts, stories, and ideas with the world. <br /> Whether you're a seasoned writer or just starting, our platform makes it easy to create, publish, and <br /> manage your blog posts.
          {/* <Box component="span" style={{ marginLeft: 5 }}>
            <Link href="https://www.linkedin.com/in/adeeb-khan-984125193?utm_source=share&utm_campaign=share_via&utm_content=profile" color="inherit" target="_blank"><LinkedIn /></Link>
          </Box> */}
        </Text>
        <Text variant="h5">
          I'm here for you! Feel free to reach out to me on
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link href="https://www.instagram.com/adeeb_khan_4786/" color="inherit" target="_blank">
              <Instagram />
            </Link>
          </Box>
          or drop me an Email
          <Link href="mailto:adeebkhan4786@gmail.com?Subject=To connect with MyBlogDiary" target="_blank" color="inherit">
            <Email />
          </Link>. <br />
          Let's connect and discuss how we can bring your ideas to life!
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link href="https://www.linkedin.com/in/adeeb-khan-984125193?utm_source=share&utm_campaign=share_via&utm_content=profile" color="inherit" target="_blank"><LinkedIn /></Link>
          </Box>
        </Text>
      </Wrapper>
    </Box>
  )
}

export default About;
