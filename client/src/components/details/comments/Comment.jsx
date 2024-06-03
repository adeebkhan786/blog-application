import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DataContext } from "../../../context/DataProvider";

const Comment = ({ comment }) => {
  const { account } = useContext(DataContext);

  return (
    <Box>
      <Box>
        <Typography>{comment.name}</Typography>
        <Typography>{new Date(comment.date).toDateString()}</Typography>
        {comment.name === account.username} && <Delete />
      </Box>


      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </Box>
  )
}

export default Comment;