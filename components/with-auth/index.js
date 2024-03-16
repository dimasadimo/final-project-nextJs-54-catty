const withAuth = (Component) => {
  return function WithAuth(props) {
    // const token = Cookies.get('user_token');;

    // if (!token) return <Component {...props} />

    return <Component {...props} />
  };
};

export default withAuth;