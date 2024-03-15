//import { useMutation } from "@/hooks/useMutation";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Text,
  Link,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

const SignIn = () => {
  const toast = useToast();
  const router = useRouter();
  //const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: '',
    password: ''
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    // const response = await mutate({ url: 'https://paace-f178cafcae7b.nevacloud.io/api/login', payload});
  
    // if(!response.success) { 
    //   toast({
    //     title: 'Login Failed',
    //     description: 'Email and password is incorrect',
    //     status: 'error',
    //     duration: 2000,
    //     isClosable: true,
    //     position: 'top',
    //   })
    // } else {
    //   Cookies.set("user_token", response.data.token, {
    //     expires: new Date(response.data.expires_at),
    //     path: '/'
    //   });
    //   router.push('/')
    // }
  };

  return (
    <Box h='calc(90vh)'>
      <Flex alignItems='center' justifyContent='center' height='100%'>
        <Stack direction='column'>
          <Heading size='lg' fontSize='28px' mb='4'>Sign in to Catty</Heading>
          <FormControl mt='2' isInvalid={payload?.email === ''}>
            <FormLabel>Email Address</FormLabel>
            <Input 
              value={payload.email} 
              placeholder="Email"
              onChange={(event) =>
                setPayload({ ...payload, email: event.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup size='lg'>
              <Input 
                value={payload.password} 
                placeholder="Password" 
                type={show ? 'text' : 'password'}
                onChange={(event) =>
                  setPayload({ ...payload, password: event.target.value })
                }
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? <ViewOffIcon w={5} h={5} /> : <ViewIcon w={5} h={5} />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <Button mt='2' width="100%" backgroundColor="#329795" color="white" 
              onClick={() => handleSubmit()}
              _hover={{ backgroundColor: "#59C9C6" }}
            >Sign In</Button>
          </FormControl>
          <Text fontSize='sm'>
            Don't have an account? <Link href="/register" color="black" textDecoration="underline">Sign up</Link>
          </Text>
        </Stack>
      </Flex>
    </Box>
  )
}

export default SignIn;