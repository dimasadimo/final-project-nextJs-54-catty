import withAuth from "../with-auth";
import Link from "next/link";
import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { useMutation } from '@/hooks/useMutation';
import { useRouter } from "next/router";
import {
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  AvatarBadge,
  useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Cookies from "js-cookie";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Header = () => {
  
  const router = useRouter();
  const { mutate } = useMutation();
  const value = useContext(UserContext);
  const toast = useToast();
  const token = Cookies.get('user_token');
  
  const handleLogout = async () => {
    const response = await mutate({ 
      url: 'https://be.pace-unv.cloud/api/logout', 
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if(!response.success) { 
      toast({
        title: 'Logout Failed',
        description: `Error ${response?.status} ${response?.message}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } else {
      Cookies.remove('user_token');
      router.push('/login');
      toast({
        title: 'Logout Success',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  } 

  return (
    <div className="header">
      {token && 
        (<Menu >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar size='xs' name={value?.name} src=''> 
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<AccountBoxOutlinedIcon />} onClick={() => router.push('/profile')}>My Profile</MenuItem>
            <MenuItem icon={<NotificationsActiveOutlinedIcon />} onClick={() => router.push('/notifications')}>Notifications</MenuItem>
            <MenuItem icon={<LogoutOutlinedIcon />} onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>)
      }
      <Heading size='lg' color="#329795">
        <Link href="/" >Catty</Link>
      </Heading>
    </div>
  )
}

export default withAuth(Header);