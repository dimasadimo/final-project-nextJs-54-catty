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
  CircularProgress,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import PostCard from "../common/postCard";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "@/context/userContext";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from 'next/router';

const Profiles = ({ isDetail }) => {

  const value = useContext(UserContext);
  const toast = useToast();
  const { mutate } = useMutation();
  const [post, setPost] = useState({
    description: "",
  });
  const [user, setUser] = useState({
    data: null,
    isLoading: false,
    isError: false,
  }); 
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const token = Cookies.get('user_token');
  const router = useRouter();
  const { id } = router?.query || {};

  const { data: posts, isLoading } = useQueries({ prefixUrl: isDetail ? `https://paace-f178cafcae7b.nevacloud.io/api/posts/${id}`:
      "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=me", 
    headers: {
      Authorization: `Bearer ${token}`,
    },
    dependencies: shouldRefetch,
  });

  const fetchingUser = useCallback(async ({ url = "", method = "GET", headers = {} } = {}) => {
    try {
      setUser({
        ...user,
        data: null,
        isLoading: true,
        isError: false,
      });
      const response = await fetch(url, { method, headers: {...headers} });
      const result = await response.json();
      setUser({
        ...useQueries,
        data: result,
        isLoading: false,
      });
      } catch (error) {
        setUser({
        ...user,
        isError: true,
        isLoading: false,
      });
    };
  }, []);

  useEffect(() => {
    if(id) {
      fetchingUser({ 
        url:`https://paace-f178cafcae7b.nevacloud.io/api/user/${id}`, 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, [id]);

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

  
  return (
    isDetail && isLoading && user?.isLoading ? 
    <Flex marginTop='25rem' direction="column" alignItems="center">
      <CircularProgress isIndeterminate color='#329795' />
    </Flex> :
    <Box marginBottom="4">
      <Flex margin="0" 
        position="fixed"
        top="5.5rem"
        zIndex="2"
      >
        <Card width={"27rem"} align='center'>
          <CardHeader paddingBottom="0">
            <Flex spacing='4' flexDirection="column" alignItems="center">
              <Avatar name={isDetail ? user?.data?.data?.name : value?.name} src='' />
              <Text as='b' mt="2">{isDetail ? user?.data?.data?.name : value?.name}</Text>
            </Flex>
          </CardHeader>
          <CardBody paddingTop="2" mt="2">
            <Flex spacing='4' flexDirection="row" >
              <Flex spacing='4' flexDirection="column" width="6.5rem">
                <Text fontSize='sm' fontWeight={500}>Email</Text>
                <Text fontSize='xs' mt='1'>{isDetail ? user?.data?.data?.email : value?.email}</Text>
              </Flex>
              <Flex spacing='4' flexDirection="column" width="4rem" ml="2">
                <Text fontSize='sm' fontWeight={500}>Hobby</Text>
                <Text fontSize='xs' mt='1'>{isDetail ? user?.data?.data?.hobby || "-" : value?.hobby || "-"}</Text>
              </Flex>
              <Flex spacing='4' flexDirection="column" width="6rem" ml="2">
                <Text fontSize='sm' fontWeight={500}>Date of birth</Text>
                <Text fontSize='xs' mt='1'>{isDetail ? user?.data?.data?.dob || "-" : value?.dob || "-"}</Text>
              </Flex>
              <Flex spacing='4' flexDirection="column" width="6rem" ml="2">
                <Text fontSize='sm' fontWeight={500}>Phone</Text>
                <Text fontSize='xs' mt='1'>{isDetail ? user?.data?.data?.phone || "-" : value?.phone || "-"}</Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      { !isDetail &&
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
      }
      <Flex marginTop={!isDetail ? '25rem' : '13rem'}>
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