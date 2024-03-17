import {
  GridItem,
  Card,
  CardBody,
  Flex,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import moment from 'moment/moment';
import { useRouter } from 'next/router';

const NotificationCard = ({ notification }) => {
  const router = useRouter();
  const localCreateDate = new Date(notification?.created_at);

  return (
    <GridItem >
      <Card width={"27rem"} >
        <CardBody p={"10px"} >
          <Flex alignItems="center">
            <Button rounded="full" paddingLeft="10px" paddingRight="10px" onClick={() => router.push(`profile/${notification?.user?.id}`)}>
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

export default NotificationCard;