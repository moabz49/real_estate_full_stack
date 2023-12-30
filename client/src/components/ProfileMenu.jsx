import React from 'react';
import { Menu, Avatar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

// Every App has a history stack which means that when you click on the <- arrow you can go to the page you previously where on.
// But this could be an issue when a User logins to your website and then decides to go <- as this could take them to login page AGAIN.
// To prevent this from happening we use {replace: true} which is a feature from react-router-dom which will essentially take the 
// .. user back to the page BEFORE THE LOGIN PAGE.(Skipping the page.)

const ProfileMenu = ({ user, logout}) => {
    const navigate = useNavigate();
    // const [opened, setOpened] = useState(false);
    
    return (
        <Menu shadow="md" width={200} zIndex={9999} >
        <Menu.Target>
          <Avatar src={user?.picture} alt="profileImage" className='rounded-full cursor-pointer'/>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item  onClick={() => navigate("./favourites", {replace: true})}>
            Favourites
          </Menu.Item>
          <Menu.Item  onClick={() => navigate("./bookings", {replace: true})}>
            Bookings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={() => {
                localStorage.clear();
                logout();
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
}
export default ProfileMenu
