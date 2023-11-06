import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Quản lý tài khoản",
    href: "/UserManagement",
    icon: "bi bi-person-check",
  },
  {
    title: "Quản lý khuyến mãi",
    href: "/VoucherManagement",
    icon: "bi bi-gift",
  },
  {
    title: "Quản lý quảng cáo",
    href: "/AdsManagement",
    icon: "bi bi-badge-ad",
  },
  {
    title: "Quản lý dịch vụ",
    href: "/ServiceManagement",
    icon: "bi bi-briefcase",
  },
  {
    title: "Quản lý phản hồi",
    href: "/Feedback",
    icon: "bi bi-bug",
  },
  {
    title: "Quản lý thanh toán",
    href: "/Payment",
    icon: "bi bi-credit-card",
  },
  {
    title: "Quản lý hệ thống",
    href: "/SystemManagement",
    icon: "bi bi-gear",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <div className="w-100 d-flex justify-content-center">
          <Logo />
        </div>
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
