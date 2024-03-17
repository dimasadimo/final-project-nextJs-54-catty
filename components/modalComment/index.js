import PropTypes from 'prop-types';
import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
  Flex,
  Grid,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useMutation } from '@/hooks/useMutation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useQueries } from '@/hooks/useQueries';
import CommentCard from '../common/commentCard';

const ModalComment = ({ data, isOpen, onClose }) => {
  
  const toast = useToast();
  const { mutate } = useMutation();
  const [post, setPost] = useState({
    description: "",
  });
  const token = Cookies.get('user_token');
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { data: posts, isLoading } = useQueries({ prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${data?.id}`, 
    headers: {
      Authorization: `Bearer ${token}`,
    },
    dependencies: shouldRefetch,
  });

  const handleSubmit = async () => {
    const response = await mutate({ url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${data?.id}`, payload: {...post}, 
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
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent containerProps={{ left: '-8px' }} >
        <ModalHeader>Comment Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb='5' overflowY="scroll" maxHeight="70vh" overflowX="scroll">
          <Flex 
            margin="0" 
            position="fixed"
            top="8rem"
            zIndex="2"
          >
            <Card width={"24rem"}>
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
                >Comment</Button>
              </CardBody>
            </Card>  
          </Flex>
          <Flex marginTop='11rem'>
            <Grid gap={5}>
            {posts?.data?.map((item) => (
              <CommentCard 
                key={item?.id} 
                comment={item} 
                setShouldRefetch={setShouldRefetch} 
                shouldRefetch={shouldRefetch}
              />
            ))}
            </Grid>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

ModalComment.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object,
};

export default ModalComment;