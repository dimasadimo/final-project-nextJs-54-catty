import { useQueries } from "@/hooks/useQueries";
import {
  Box,
  Flex,
  Grid,
  Card,
  CardBody,
  Button,
  Textarea,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import PostCard from "../common/postCard";
import { useMutation } from "@/hooks/useMutation";
import { useState } from "react";

const Posts = () => {

  const toast = useToast();
  const { mutate, isLoading: isLoadingPost } = useMutation();
  const [post, setPost] = useState({
    description: "",
  });
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const token = Cookies.get('user_token');
  const { data: posts, isLoading } = useQueries({ prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all", 
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
      setPost({
        ...post,
        description: "",
      });
    }
  };

  return (
    <Box marginBottom="4">
      <Flex margin="0" 
        position="fixed"
        top="5.5rem"
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
              isLoading={isLoadingPost}
              loadingText='Posting'
              colorScheme='#59C9C6'
              variant='outline'
            >Post</Button>
          </CardBody>
        </Card>
      </Flex>
      <Flex marginTop='13rem' direction="column" alignItems="center">
        {
          isLoading ? <CircularProgress isIndeterminate color='#329795' /> :
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
        }
      </Flex>
    </Box>
  );
};

export default Posts;