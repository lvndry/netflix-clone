import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

export const Navbar: React.FC = () => {
  const [showNavBackground, setShowNavBackground] = useState(false);

  const handleScroll = () => {
    console.log(window.scrollY, showNavBackground);

    if (window.scrollY > 100 && !showNavBackground) {
      setShowNavBackground(true);
    } else {
      setShowNavBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavbarContainer scrolled={showNavBackground}>
      <Logo
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Avatar"
      />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100vw;
  padding: 20px;
  padding-top: 8px;

  display: flex;
  justify-content: space-between;
  z-index: 1;
  background-color: ${({ scrolled }) => (scrolled ? "#111" : "transparent")};
  transition: all 0.3s;
`;

const Logo = styled.img`
  width: 80px;
  object-fit: contain;
`;

const Avatar = styled.img`
  object-fit: contain;
  width: 45px;
  margin-right: 5%;
`;
