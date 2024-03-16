import { useMutation } from "@/hooks/useMutation";
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
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const SignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    dob: "",
    phone: "",
    hobby: "",
    password: ""
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    const response = await mutate({ url: 'https://paace-f178cafcae7b.nevacloud.io/api/register', payload});
  
    if(!response?.success) { 
      toast({
        title: 'Register Failed',
        description: `Error ${response?.status} ${response?.message}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } else {
      router.push('/login');
      toast({
        title: 'Success!',
        description: "Your account has been created",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
  };

  return (
    <Box h='calc(90vh)'>
      <Flex alignItems='center' justifyContent='center' height='100%'>
        <Stack direction='column'>
          <Heading size='lg' fontSize='28px' mb='4'>Create your account</Heading>
          <FormControl mt='2' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
              value={payload?.name} 
              placeholder="Name"
              onChange={(event) =>
                setPayload({ ...payload, name: event.target.value })
              }
              isReaquired
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input 
              value={payload?.email} 
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
                value={payload?.password} 
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
              value={payload?.dob} 
              placeholder="Select Date"
              size="md"
              type="date"            
              onChange={(event) =>
                setPayload({ ...payload, dob: event.target.value })
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
              value={payload?.phone} 
              type='tel' 
              placeholder='Phone number'
              onChange={(event) =>
                setPayload({ ...payload, phone: event.target.value })
              }
            />
          </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Hobby</FormLabel>
            <Input 
              value={payload?.hobby} 
              placeholder="Hobby"
              onChange={(event) =>
                setPayload({ ...payload, hobby: event.target.value })
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
            Already have an account? <Link href="/login" ><span style={{ textDecoration: "underline" }}>Sign in</span></Link>
          </Text>
        </Stack>
      </Flex>
    </Box>
  )
}

export default SignUp;