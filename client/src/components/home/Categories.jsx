import { Link, useSearchParams } from "react-router-dom";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from "@mui/material";
import { categories } from '../../constants/data';


//  
// background-color:#5f6773;
const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);;
  `;


const StyledButton = styled(Button)`
  margin:20px;
  width: 85%;
  background-color: #6495ED;
  color: #FFF;
  `;

const StyledLink = styled(Link)`
  text-decoration:none;
  color:inherit;`

const Categories = () => {

  const [searchParams] = useSearchParams();  //searchParams ek custom hook hai
  const category = searchParams.get('category')   // search parameters se value nikalne ke liye.
  console.log("HDEJEHUHDHD", category)
  return (
    <>
      <StyledLink to={`/create?category=${category || ''}`}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink >
      <StyledTable>

        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">
                All Categories
              </StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            categories.map(category => (
              <TableRow key={category.id}>
                <StyledLink to={`/?category=${category.type}`}>
                  <TableCell>{category.type}</TableCell>
                </StyledLink>
              </TableRow>
            ))
          }
        </TableBody>
      </StyledTable>
    </>
  )
}
export default Categories;