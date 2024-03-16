import PropTypes from 'prop-types';
import {
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Text,
  Avatar,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import moment from 'moment/moment';

const PostCard = ({ post }) => {
  const localCreateDate = new Date(post?.created_at);
  return (
    <GridItem >
      <Card width={"27rem"}>
        <CardHeader paddingBottom="0">
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={post?.user?.name} src='' />

              <Box>
                <Heading size='sm'>{post?.user?.name}</Heading>
                <Text fontSize='md'>{post?.user?.email}</Text>
                <Text fontSize='sm'>{moment(localCreateDate).fromNow()}</Text>
              </Box>
            </Flex>
            {/* <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
            /> */}
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{post?.description}</Text>
        </CardBody>
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
          paddingTop="0"
          paddingBottom="10px"
        >
          <Button flex='1' variant='ghost' //leftIcon={<BiLike />}
          >
            {post?.likes_count} Likes
          </Button>
          <Button flex='1' variant='ghost' //leftIcon={<BiChat />}
          >
            {post?.replies_count} Comments
          </Button>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;