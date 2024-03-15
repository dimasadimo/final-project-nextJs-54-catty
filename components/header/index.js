import withAuth from "../with-auth";
import styles from './styles.module.css';
import { Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <div className={styles.header}>
      <Heading size='lg'>Catty</Heading>
    </div>
  )
}

export default withAuth(Header);