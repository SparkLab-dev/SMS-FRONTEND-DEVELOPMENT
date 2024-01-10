import { FC, useEffect, useRef } from "react";

//style
import {
  Center,
  CenterLi,
  CenterUl,
  Sidebar,
  SidebarItems,
  SidebarLink,
  SidebarSpan,
} from "./style/Sidebar.style";

//mui icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ContactsIcon from "@mui/icons-material/Contacts";
import ReorderIcon from "@mui/icons-material/Reorder";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

//redux
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}
const SideBar: FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  //get userRole from redux
  const userRole = useSelector((state: RootState) => state.login.user?.role);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleLinkClickAndRedirect = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <Sidebar style={{ display: isOpen ? "block" : "none" }} ref={sidebarRef}>
        <SidebarItems>
          <Center>
            <CenterUl>
              {userRole === "ADMIN" && (
                <>
                  <SidebarLink to="/home">
                    <CenterLi>
                      <HomeIcon className="icon" />
                      <SidebarSpan id="hoverIcon">Home</SidebarSpan>
                    </CenterLi>
                  </SidebarLink>
                  <SidebarLink to="/adminNotification">
                    <CenterLi>
                      <CircleNotificationsIcon className="icon" />
                      <SidebarSpan id="hoverIcon">Notification</SidebarSpan>
                    </CenterLi>
                  </SidebarLink>
                  <SidebarLink to="/vendorTable">
                    <CenterLi>
                      <DashboardIcon className="icon" />
                      <SidebarSpan id="hoverIcon">Vendors</SidebarSpan>
                    </CenterLi>
                  </SidebarLink>
                </>
              )}
              {userRole === "EMPLOYEE" && (
                <>
                  <SidebarLink
                    to="/orderTable"
                    onClick={() => handleLinkClickAndRedirect("/orderTable")}
                  >
                    <CenterLi>
                      <ReorderIcon className="icon" />
                      <SidebarSpan id="hoverIcon">Order Table</SidebarSpan>
                    </CenterLi>
                  </SidebarLink>
                  <SidebarLink to="/table">
                    <CenterLi>
                      <InventoryIcon className="icon" />
                      <SidebarSpan id="hoverIcon">Product Table</SidebarSpan>
                    </CenterLi>
                  </SidebarLink>
                  <SidebarLink to="/getCategory">
                    <CenterLi>
                      <CategoryIcon className="icon" />
                      <SidebarSpan id="hoverIcon">Category</SidebarSpan>
                    </CenterLi>
                  </SidebarLink>
                  <SidebarLink to="/accountB2BTable">
                    <CenterLi>
                      <AccountBalanceIcon className="icon" />
                      <SidebarSpan id="hoverIcon">Account</SidebarSpan>
                    </CenterLi>
                  </SidebarLink>
                  <SidebarLink to="/contactsTable">
                    <CenterLi>
                      <ContactsIcon className="icon" />
                      <SidebarSpan id="hoverIcon">Contact</SidebarSpan>
                    </CenterLi>
                  </SidebarLink>
                </>
              )}
            </CenterUl>
          </Center>
        </SidebarItems>
      </Sidebar>
    </>
  );
};

export default SideBar;
