import { useQueries } from "@/hooks/useQueries";
import {
  Box,
  Flex,
  Grid,
  CircularProgress,
  Text
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import NotificationCard from "../common/notificationCard";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Notifications = () => {

  const token = Cookies.get('user_token');

  const { data: notifications, isLoading } = useQueries({ prefixUrl: "https://be.pace-unv.cloud/api/notifications", 
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return (
    <Box marginBottom="4" marginTop="4">
      <Flex direction="column" alignItems="center">
        {isLoading ? 
          <CircularProgress isIndeterminate color='#329795' marginTop='25rem'/> :
          <Grid gap={3}>
            {notifications?.data?.length > 0 ? 
              notifications?.data?.map((item) => (
                <NotificationCard key={item?.id} notification={item}/>
              )) 
              : 
              <Flex>
                <NotificationsNoneOutlinedIcon />
                <Text ml='2'>No notifications</Text>
              </Flex>
            }
          </Grid>
        }
      </Flex>
    </Box>
  );
}

export default Notifications;
