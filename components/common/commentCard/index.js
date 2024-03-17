import {
  GridItem,
  Card,
  CardBody,
  Flex,
  Text,
  Avatar,
  Button,
  useToast,
} from "@chakra-ui/react";
import moment from 'moment/moment';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";

const CommentCard = ({ comment, shouldRefetch, setShouldRefetch }) => {

  const toast = useToast();
  const { mutate } = useMutation();
  const token = Cookies.get('user_token');
  const localCreateDate = new Date(comment?.created_at);

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
      customClass: {
        container: 'custom-swal-container',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await mutate({ url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${comment?.id}`,
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
      <Card width={"24rem"} >
        <CardBody p={"10px"} >
          <Flex alignItems="center" >
            <Flex flexDirection="column">
              <Flex justifyContent="space-between" alignItems="center" width={"23rem"}>
                <Button Button rounded="full" paddingLeft="10px" paddingRight="10px">
                  <Avatar size='xs' name={comment?.user?.name} src='' />
                  <Text marginLeft="7px" fontSize="sm">
                    {comment?.user?.name} {comment?.is_own_reply && '(You)'}
                  </Text>
                </Button>
                { comment?.is_own_reply && 
                  <Button rounded="full" paddingLeft="10px" paddingRight="10px" marginLeft="auto" onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon style={{ color: 'red' }} />
                  </Button>
                }
              </Flex>
              <Text marginLeft="7px" marginTop="5px" fontSize="xs" >
                {moment(localCreateDate).fromNow()}
              </Text>
              <Text marginLeft="7px" marginTop="7px" fontSize="md">{comment?.description}</Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default CommentCard;