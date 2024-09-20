import { Avatar, Box, IconButton, Menu, Tooltip } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutBtn from "./LogoutBtn";

interface MobileLoginStateProps {
  imgPath: string | null | undefined;
}
const MobileLoginState = (props: MobileLoginStateProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="profile" src={props.imgPath ? props.imgPath : ""}>
            {props.imgPath ? "" : <PersonIcon />}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: "45px",
          "& .MuiPaper-root": {
            // 여기에 Paper의 스타일을 추가하세요
            backgroundColor: "primary.main", // 예시로 배경색을 설정
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <LogoutBtn />
      </Menu>
    </Box>
  );
};

export default MobileLoginState;
