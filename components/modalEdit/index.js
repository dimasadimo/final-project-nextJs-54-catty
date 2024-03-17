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
} from "@chakra-ui/react";
import { useMutation } from '@/hooks/useMutation';
import { useState } from 'react';
import Cookies from 'js-cookie';

const ModalEdit = ({ data, isOpen, onClose, setShouldRefetch, shouldRefetch }) => {
  
  const toast = useToast();
  const { mutate } = useMutation();
  const [post, setPost] = useState({
    description: data?.description,
  });
  const token = Cookies.get('user_token');

  const handleSubmit = async () => {
    const response = await mutate({ url: `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${data?.id}`, payload: {...post}, 
      method: 'PATCH',
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
      <ModalOverlay />
      <ModalContent containerProps={{ left: '-8px' }} >
        <ModalHeader>Edit Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb='5'>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalEdit;