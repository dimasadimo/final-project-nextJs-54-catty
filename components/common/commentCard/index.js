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

const CommentCard = ({ comment }) => {
  const localCreateDate = new Date(comment?.created_at);

  return (
    <GridItem >
      <Card width={"24rem"} >
        <CardBody p={"10px"} >
          <Flex alignItems="center">
            <Flex flexDirection="column">
              <Button rounded="full" paddingLeft="10px" paddingRight="10px">
                <Avatar size='xs' name={comment?.user?.name} src='' />
              <Text marginLeft="7px" fontSize="sm">{comment?.user?.name} {comment?.is_own_post && '(You)'}</Text>
              </Button>
              <Text marginLeft="7px" marginTop="5px" fontSize="xs" >{moment(localCreateDate).fromNow()}</Text>
              <Text marginLeft="7px" marginTop="7px" fontSize="md">{comment?.description}</Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </GridItem>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object,
};

export default CommentCard;