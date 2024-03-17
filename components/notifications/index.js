import { useQueries } from "@/hooks/useQueries";
import {
  Box,
  Flex,
  Grid,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import NotificationCard from "../common/notificationCard";

const Notifications = () => {

  const token = Cookies.get('user_token');

  const { data: notifications, isLoading } = useQueries({ prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notifications", 
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  
  if(isLoading) return <p>Loading</p>

  return (
    <Box marginBottom="4" marginTop="4">
      <Flex>
        <Grid gap={3}>
        {notifications?.data?.map((item) => (
          <NotificationCard key={item?.id} notification={item}/>
        ))}
        </Grid>
      </Flex>
    </Box>
  );
}

export default Notifications;