import { useState, useContext } from "react";
import API from "../../service/api";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import { useNavigate, Link } from "react-router-dom";


//use styled component for css in material ui.
// Box ke upr styling krni hai isliye parameter me Box likha hai.
//  jis v element ya tag me styling krni hogi uska naam parameter me likhenge.
// aur backticks (``) ke andar styling krnge.

//Box with css component me store ho gya..


// margin-top:20px;
const Component = styled(Box)`
  width:400px;
  margin:auto;
  box-shadow:5px 2px 5px 2px rgb(0 0 0/2.6); 
  `;


//img ek html tag element hai to usko hum backicks lgaakr (string bnaake) tb paramter me send krnge.
// aur iski styling krne ke liye hme parenthesis lgaake object pass krna pdta hai..EX ({})
// ab hum ({}) iske andar styling krnge.
const Image = styled(`img`)({
  width: 100,
  margin: 'auto',
  display: 'flex',
  padding: '50px 0 0'

});


const Wrapper = styled(Box)`
  padding:25px 35px;
  display:flex;
  flex:1;                         // ye flex direction ko ek hi line me move kr deta hai
  flex-direction: column;         // fir isko btaana pdta hai ki ye kis direction me move kre.
  & > div, & > button, & > p {
    margin-top : 20px
  }  `


const LoginButton = styled(Button)`
  text-transform: none;
  background: #FB641b;  //change kr denge hum
  color:#fff;
  height:48px;
  border-radius: 2px;
  `;


const SignUpButton = styled(Button)`
  text-transform: none;
  background: #fff;  //change kr denge hum
  color:#2874f0;
  height:48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%)
  `


const Text = styled(Typography)`
  color:#878787;
  font-size: 16px;
  `


const signUpInitialValues = {
  name: '',
  username: '',
  password: ''
}


const loginIntitialValues = {
  username: '',
  password: ''
}


const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
    `


// const ForgottenPassword = styled(Typography)`
//   font-size:14px;
//   color:black;
//   margin-top: 5px  !important`



const StyledForgottenLink = styled(Link)`
  text-decoration:none;
  color:inherit;
  margin-top: 5px;`

const Login = ({ isUserAuthenticated }) => {

  // const imageURL = "D:\\mern-stack\\client\\public\\images\\adeeb.jpg"
  // const imageURL = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const imageURL = "data:image/png;base64,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";

  const [account, toggleAccount] = useState('login');
  const [signup, setSignup] = useState(signUpInitialValues);   //signup ke input ko fetch krne ke liye... isko baad me useRef() se change krna hai.
  const [login, setLogin] = useState(loginIntitialValues)
  const [error, setError] = useState('');

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    account === 'login' ? toggleAccount('signup') : toggleAccount('login')
  };



  //Signup
  const onInputChange = (e) => {
    // console.log(e.target.name, e.target.value);
    // console.log("inputssss", { ...signup, [e.target.name]: e.target.value })
    setSignup({ ...signup, [e.target.name]: e.target.value })
    // console.log("ADDSDDSDS", { [e.target.name]: e.target.values })   //append kr rhe hain hrr baar, override nhi kr rhe hain jb v input change ho rha hai to.
  }


  const signupUser = async () => {
    let response = await API.userSignup(signup);
    // console.log(response);
    if (response?.isSuccess) {
      setError('');
      setSignup(signUpInitialValues);
      toggleAccount('login')
    } else {
      // setError('Something went wrong, Please try again later')
      setError(response?.msg)
    }
  }


  //Login
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const loginUser = async () => {
    const response = await API.userLogin(login);
    if (response?.isSuccess) {
      setError('');
      // setLogin(loginIntitialValues);
      sessionStorage.setItem('accessToken', `Bearer ${response?.data?.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${response?.data?.refreshToken}`);


      //name aur username ko hme aese store kraana hai jaise hme apne pure project ke andar use krna hai.
      //tb hme useContext hook ka use krna pdega.
      setAccount({ username: response?.data?.username, name: response?.data?.name });
      isUserAuthenticated(true)
      navigate('/');


    } else {
      // setError(`Something went wrong, Please try again later`)
      setError(response?.msg)
    }
  }

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="Login" />
        {account === 'login' ?
          <Wrapper>
            <TextField variant="standard" value={login.username} label="Enter Username" onChange={(e) => onValueChange(e)} name='username' />   {/*agr hum chahte hain ki value preFilled hokr aaye tb hme value ke andar likhna hota hai */}
            <TextField variant="standard" value={login.password} label="Enter Password" onChange={(e) => onValueChange(e)} name='password' />   {/*agr hum chahte hain ki value preFilled hokr aaye tb hme value ke andar likhna hota hai */}

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
            <StyledForgottenLink to='/forgotten-password'>Forgotten Password?</StyledForgottenLink>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <SignUpButton onClick={() => toggleSignup()}>Create an account</SignUpButton>
          </Wrapper>
          :
          <Wrapper>
            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label="Enter Name" />
            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label="Enter Username" />
            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label="Enter Password" />

            {error && <Error>{error}</Error>}

            <SignUpButton onClick={() => signupUser()}>Signup</SignUpButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
          </Wrapper>
        }
      </Box>
    </Component>
  )
}

export default Login