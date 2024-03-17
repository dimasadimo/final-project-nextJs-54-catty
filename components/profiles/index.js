import { useQueries } from "@/hooks/useQueries";
import {
  Box,
  Flex,
  Grid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Textarea,
  Text,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import PostCard from "../common/postCard";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { useMutation } from "@/hooks/useMutation";

const Profiles = () => {

  const value = useContext(UserContext);
  const toast = useToast();
  const { mutate } = useMutation();
  const [post, setPost] = useState({
    description: "",
  });
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const token = Cookies.get('user_token');

  const { data: posts, isLoading } = useQueries({ prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=me", 
    headers: {
      Authorization: `Bearer ${token}`,
    },
    dependencies: shouldRefetch,
  });

  const handleSubmit = async () => {
    const response = await mutate({ url: 'https://paace-f178cafcae7b.nevacloud.io/api/post', payload: {...post}, 
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  
    if(!response?.success) { 
      toast({
        title: 'Internal Server Error',
        description: `Error ${response?.status} ${response?.message}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } else {
      setShouldRefetch(!shouldRefetch);
    }
  };

  if(isLoading) return <p>Loading</p>
  return (
    <Box marginBottom="4">
      <Flex margin="0" 
        position="fixed"
        top="5.5rem"
        zIndex="2"
      >
        <Card width={"27rem"} align='center'>
          <CardHeader paddingBottom="0">
            <Flex spacing='4' flexDirection="column" alignItems="center">
              <Avatar name={value?.name} src='' />
              <Text as='b' mt="2">{value?.name}</Text>
            </Flex>
          </CardHeader>
          <CardBody paddingTop="2" mt="2">
            <Flex spacing='4' flexDirection="row" >
              <Flex spacing='4' flexDirection="column" width="7rem">
                <Text fontSize='sm' fontWeight={500}>Email</Text>
                <Text fontSize='xs' mt='1'>{value?.email}</Text>
              </Flex>
              <Flex spacing='4' flexDirection="column" width="4rem" ml="2">
                <Text fontSize='sm' fontWeight={500}>Hobby</Text>
                <Text fontSize='xs' mt='1'>{value?.hobby || "-"}</Text>
              </Flex>
              <Flex spacing='4' flexDirection="column" width="6rem" ml="2">
                <Text fontSize='sm' fontWeight={500}>Date of birth</Text>
                <Text fontSize='xs' mt='1'>{value?.dob || "-"}</Text>
              </Flex>
              <Flex spacing='4' flexDirection="column" width="5rem" ml="2">
                <Text fontSize='sm' fontWeight={500}>Phone</Text>
                <Text fontSize='xs' mt='1'>{value?.phone || "-"}</Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      <Flex margin="0" 
        position="fixed"
        top="17.5rem"
        zIndex="2"
      >
        <Card width={"27rem"}>
          <CardBody>
            <Textarea
              onChange={(event) =>
                setPost({ ...post, description: event.target.value })
              }
              value={post?.description}
              backgroundColor="gray.50"
            />
            <Button mt='2' width="100%" backgroundColor="#329795" color="white" 
              onClick={handleSubmit}
              _hover={{ backgroundColor: "#59C9C6" }}
              isDisabled={!post?.description}
            >Post</Button>
          </CardBody>
        </Card>
          
      </Flex>
      <Flex marginTop='25rem'>
        <Grid gap={5}>
        {posts?.data?.map((item) => (
          <PostCard 
            key={item?.id} 
            post={item}
            setShouldRefetch={setShouldRefetch} 
            shouldRefetch={shouldRefetch}
          />
        ))}
        </Grid>
      </Flex>
    </Box>
  );
}

export default Profiles;