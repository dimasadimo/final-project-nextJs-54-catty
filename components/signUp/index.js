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
  InputLeftAddon,
  InputGroup,
  Text,
  Link,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUp = () => {
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
          <Heading size='lg' fontSize='28px' mb='4'>Create your account</Heading>
          <FormControl mt='2' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
              value={payload.email} 
              placeholder="Name"
              onChange={(event) =>
                setPayload({ ...payload, email: event.target.value })
              }
              isReaquired
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input 
              value={payload.email} 
              placeholder="Email"
              onChange={(event) =>
                setPayload({ ...payload, email: event.target.value })
              }
            />
          </FormControl>
          <FormControl isRequired>
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
          <FormControl >
            <FormLabel>Date of birth</FormLabel>
            <Input 
              value={payload.email} 
              placeholder="Select Date"
              size="md"
              type="date"            
              onChange={(event) =>
                setPayload({ ...payload, email: event.target.value })
              }
            />
          </FormControl>
          <FormControl >
            <FormLabel>Phone number</FormLabel>
            <InputGroup>
            <InputLeftAddon>
              +62
            </InputLeftAddon>
            <Input 
              type='tel' 
              placeholder='Phone number'
            />
          </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Hobby</FormLabel>
            <Input 
              value={payload.email} 
              placeholder="Hobby"
              onChange={(event) =>
                setPayload({ ...payload, email: event.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <Button mt='4' width="100%" backgroundColor="#329795" color="white" 
              onClick={() => handleSubmit()}
              _hover={{ backgroundColor: "#59C9C6" }}
            >Sign Up</Button>
          </FormControl>
          <Text fontSize='sm'>
            Already have an account? <Link href="/login" color="black" textDecoration="underline">Sign in</Link>
          </Text>
        </Stack>
      </Flex>
    </Box>
  )
}

export default SignUp;