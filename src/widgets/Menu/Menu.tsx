import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import { Flex } from "../../components/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./Logo";
import Panel from "./Panel";
import UserBlock from "./UserBlock";
import { NavProps } from "./types";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import Avatar from "./Avatar";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: solid 1px rgba(133,133,133,0.5);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  width: 100%;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const FlexCustom = styled(Flex)`
    position: absolute;
    right: 250px;
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    a{
      padding: 6px 20px;
      margin: 0px auto;
      color: #fff;
      font-weight: 700;
      border-radius: 20px;
      font-size: 14px;
      @media screen and (max-width: 500px){
        display: none;
      }
    }
`

const FlexCustom1 = styled(Flex)`
    position: absolute;
    right: 350px;
    a{
      padding: 6px 20px;
      margin: 0px auto;
      color: #fff;
      font-weight: 700;
      border-radius: 20px;
      font-size: 14px;
      @media screen and (max-width: 500px){
        display: none;
      }
    }
`

const FlexCustom2 = styled(Flex)`
position: absolute;
    right: 150px;
    a{
      padding: 6px 20px;
      margin: 0px auto;
      color: #fff;
      font-weight: 700;
      border-radius: 20px;
      font-size: 14px;
      @media screen and (max-width: 500px){
        display: none;
      }
    }
`

const FlexCustom3 = styled(Flex)`
    position: absolute;
    right: 450px;
    a{
      padding: 6px 20px;
      margin: 0px auto;
      color: #fff;
      font-weight: 700;
      border-radius: 20px;
      font-size: 14px;
      @media screen and (max-width: 500px){
        display: none;
      }
    }
`

const FlexCustom4 = styled(Flex)`
    position: absolute;
    right: 550px;
    a{
      padding: 6px 20px;
      margin: 0px auto;
      color: #fff;
      font-weight: 700;
      border-radius: 20px;
      font-size: 14px;
      @media screen and (max-width: 500px){
        display: none;
      }
    }
`

const FlexCustom5 = styled(Flex)`
    position: absolute;
    right: 650px;
    a{
      padding: 6px 20px;
      margin: 0px auto;
      color: #fff;
      font-weight: 700;
      border-radius: 20px;
      font-size: 14px;
      @media screen and (max-width: 500px){
        display: none;
      }
    }
`

const FlexCustom6 = styled(Flex)`
    position: absolute;
    right: 750px;
    a{
      padding: 6px 20px;
      margin: 0px auto;
      color: #fff;
      font-weight: 700;
      border-radius: 20px;
      font-size: 14px;
      @media screen and (max-width: 500px){
        display: none;
      }
    }
`

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  priceLink,
  profile,
  children,
  depositValue
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
        />

        <Flex>
          <UserBlock account={account} login={login} logout={logout} />
          {profile && <Avatar profile={profile} />}
        </Flex>
      </StyledNav>
      <BodyWrapper>
        <Panel
          isPushed={isPushed}
          isMobile={isMobile}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          langs={langs}
          setLang={setLang}
          currentLang={currentLang}
          cakePriceUsd={cakePriceUsd}
          pushNav={setIsPushed}
          links={links}
          priceLink={priceLink}
        />
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
