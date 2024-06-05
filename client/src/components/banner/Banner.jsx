

// background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;    //original
// https://cdn.dribbble.com/users/6087864/screenshots/14640847/adeeb_al_4x.jpg
// https://cdn.dribbble.com/users/6087864/screenshots/14640847/adeeb_al_4x.jpg

// https://media.licdn.com/dms/image/C4D12AQEX5XX6WPbFvQ/article-cover_image-shrink_600_2000/0/1520135991433?e=2147483647&v=beta&t=ydPXI6r5u73rPTEB9vdh0V2hRyKz8NTKgMUk7AOOuBE
import { Box, Typography, styled } from '@mui/material';
const Image = styled(Box)`
  background: url(https://www.bhmpics.com/downloads/blogs-wallpaper/1.photo-1432821596592-e2c18b78144f.jpg) center/55% repeat-x #000;
  width:100%;
  height:50vh;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  `;

const Heading = styled(Typography)`
  font-size:70px;
  color:#FFFFFF;
  line-height:1;
  `;

const SubHeading = styled(Typography)`
  margin-top:15px;
  font-sixe:20px;
  background:#2596be;   //background:#FFFFFF;
  `

const Banner = () => {
  return (
    <Image>
      <Heading>MyBlogDiary</Heading>
      {/* <SubHeading>Code for Interview</SubHeading> */}
      <SubHeading>ADEEB KHAN</SubHeading>
    </Image>
  )
}

export default Banner