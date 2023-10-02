import { Box, ColorModeProvider, Flex, ThemeProvider, theme,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Image,
  useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/Auth";
const init = {
  password:'',
  email:''
}
function Login(){
  const [obj , setObj] = useState(init);
  const [load , setLoad] = useState(false);
  const {setUser , toggleAuth} = useContext(AuthContext)
  const toast = useToast();
  const navigate = useNavigate();
  const handleChange = (e)=>{
      const {value , name} = e.target;
      setObj({...obj , [name]:value})
  }


  const handleSubmit = async(e)=>{
      e.preventDefault();
      setLoad(true)
      try {
          let res = await axios.post('https://stormy-tights-hen.cyclic.app/user/login' , obj);
          let data = await res.data;
          if(data.status){
              setLoad(false)
              toast({
                  title: 'Logged In',
                  description: "You are logged in your account",
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                  position:'top'
                })
                localStorage.setItem('triveous', JSON.stringify(data.user))
                setUser(data.user);
                toggleAuth();
                navigate('/')
          }
          else{
              setLoad(false)
              toast({
                  title: 'Error Occured',
                  description: data.message,
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                  position:'top'
                })
          }
      } catch (error) {
        setLoad(false)
          toast({
              title: 'Error Occured',
              description: error.response.data.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
              position:'top'
            })
      }
  }
  return <ThemeProvider theme={theme}>
  <ColorModeProvider>
  <Flex minHeight='100vh' mt='40px' width='full' align='center' justifyContent='center'>
  <Box 
    px={4}
    width='full'
    maxWidth='500px'
    borderRadius='10px'
    textAlign='center'
  >
    <Box p={4}>
    <Box textAlign='center'>
    <Heading color='teal'>Sign In</Heading>
  </Box>
  <Box my={8} textAlign='left'>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input required type='email' name='email' value={obj.email} onChange={(e)=>handleChange(e)} placeholder='Enter your email address' />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input required type='password' name='password' value={obj.password} onChange={(e)=>handleChange(e)} placeholder='Enter your password' />
      </FormControl>

      <Stack isInline justifyContent='right' mt={4} pr='10px'>
          <Box color='blue.300'>
            <Link to='/signup' color={`teal.500`}>Create New Account</Link>
          </Box>
      </Stack>

      <Button isLoading={load} type='submit' _hover={{bg:'teal'}}  bg='teal'  width='full' mt={4}>SIGN IN</Button>
    </form>
  </Box>
    </Box>
  </Box>
  </Flex>
  </ColorModeProvider>
  </ThemeProvider>
}


export default Login;