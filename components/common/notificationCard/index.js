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

const NotificationCard = ({ notification }) => {
  const localCreateDate = new Date(notification?.created_at);

  return (
    <GridItem >
      <Card width={"27rem"} >
        <CardBody p={"10px"} >
          <Flex alignItems="center">
            <Button rounded="full" paddingLeft="10px" paddingRight="10px">
              <Avatar size='xs' name={notification?.user?.name} src='' />
            <Text marginLeft="7px" fontSize="sm">{notification?.user?.name}</Text>
            </Button>
            <Flex flexDirection="row">
              <Text marginLeft="7px" fontSize="sm" >{notification?.remark === 'like' ? 'liked your post, ' : 'replied your post, '}
                <Text as="span" fontSize="sm" fontStyle="italic">
                  "about {moment(localCreateDate).fromNow()}"
                </Text>
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </GridItem>
  );
}

NotificationCard.propTypes = {
  notification: PropTypes.object,
};

export default NotificationCard;