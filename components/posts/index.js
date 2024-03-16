import { useQueries } from "@/hooks/useQueries";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Textarea,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import PostCard from "../common/postCard";

const Posts = () => {

  const token = Cookies.get('user_token');

  const { data: posts, isLoading } = useQueries({ prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all", 
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  console.log(posts, isLoading)
  if(isLoading) return <p>Loading</p>
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
          // onChange={(event) =>
          //   setNotes({ ...notes, description: event.target.value })
          // }
          backgroundColor="gray.50"
        />
        <Button mt='2' width="100%" backgroundColor="#329795" color="white" 
              //onClick={() => handleSubmit()}
              _hover={{ backgroundColor: "#59C9C6" }}
            >Post</Button>
          </CardBody>
        </Card>
          
      </Flex>
      <Flex marginTop='13rem'>
        <Grid gap={5}>
        {posts?.data?.map((item) => (
          <PostCard id={item?.id} post={item}/>
        ))}
        </Grid>
      </Flex>
    </Box>
  );
}

export default Posts;