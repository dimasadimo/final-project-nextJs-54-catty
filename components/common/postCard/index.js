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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import moment from 'moment/moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useMutation } from '@/hooks/useMutation';
import Swal from "sweetalert2";
import ModalEdit from '@/components/modalEdit';
import { useState } from 'react';
import ModalComment from '@/components/modalComment';

const PostCard = ({ post, setShouldRefetch, shouldRefetch }) => {

  const toast = useToast();
  const { mutate } = useMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenComment, setIsOpenComment] = useState(false);
  const token = Cookies.get('user_token');
  const localCreateDate = new Date(post?.created_at);

  const handleOpenModalComment = () => setIsOpenComment(!isOpenComment);
  const handleModalComment = () => {
    setIsOpenComment(!isOpenComment);
    setShouldRefetch(!shouldRefetch);
  }

  const handleLikes = async () => {

    const response = await mutate({ url: `https://paace-f178cafcae7b.nevacloud.io/api/${post?.is_like_post ? 'unlikes' : 'likes'}/post/${post?.id}`, 
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

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      width: '27rem',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await mutate({ url: `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${post?.id}`,
          method: 'DELETE',
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
      }
    });
  };

  return (
    <GridItem >
      <Card width={"27rem"}>
        <CardHeader paddingBottom="0">
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={post?.user?.name} src='' />
              <Box>
                <Heading size='sm'>{post?.user?.name} {post?.is_own_post && '(You)'}</Heading>
                <Text fontSize='md'>{post?.user?.email}</Text>
                <Text fontSize='sm'>{moment(localCreateDate).fromNow()}</Text>
              </Box>
            </Flex>
            {post?.is_own_post &&
              <Menu>
                <MenuButton 
                  as={IconButton} 
                  variant='unstyled' 
                  icon={<MoreVertOutlinedIcon style={{ color: 'grey' }} />} 
                  p={"0"}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#EDF2F7'
                  }}}
                />
                <MenuList >
                  <MenuItem icon={<EditNoteOutlinedIcon />} onClick={onOpen}>Edit</MenuItem>
                  <MenuItem 
                    icon={<DeleteOutlineOutlinedIcon 
                    style={{ color: 'red' }} />} style={{ color: 'red' }}
                    onClick={handleDelete}
                  >Delete</MenuItem>
                </MenuList>
              </Menu>
            }
          </Flex>
          <ModalEdit 
            isOpen={isOpen} 
            onClose={onClose} 
            data={post}
            setShouldRefetch={setShouldRefetch} 
            shouldRefetch={shouldRefetch}
          />
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
          <Button 
            flex='1' 
            variant='ghost' 
            leftIcon={post?.is_like_post ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
            onClick={handleLikes}
          >
            {post?.likes_count} Likes
          </Button>
          <Button 
            flex='1' 
            variant='ghost' 
            leftIcon={<QuestionAnswerOutlinedIcon />}
            onClick={handleOpenModalComment}
          >
            {post?.replies_count} Comments
          </Button>
          {isOpenComment && 
            <ModalComment 
              isOpen={isOpenComment} 
              onClose={handleModalComment} 
              data={post}
            />
          }
        </CardFooter>
      </Card>
    </GridItem>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
  setShouldRefetch: PropTypes.func,
  shouldRefetch: PropTypes.bool,
};

export default PostCard;