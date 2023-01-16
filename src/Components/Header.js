
const Header = (props) => {
  const show = (
    <ul>
      <li> User </li>
      <li> Admin </li>
    </ul>
  );
  return <div className="header">{show}{props.children}</div>;
};

export default Header;
