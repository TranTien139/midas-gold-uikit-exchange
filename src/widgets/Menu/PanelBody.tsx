import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../components/Svg";
import * as IconModule from "./icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "./types";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

const WrapIconSub = styled.div`
    position: absolute;
    top: 16px;
    left: 9px;
`

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container>
      {links.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = entry.label === 'Reserve Fund' ?  <Icon width="20px" height="20px" mr="8px" /> : <Icon width="24px" height="30px" mr="8px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items) {
          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              initialOpenState={entry.initialOpenState}
              className={calloutClass}
            >
              {isPushed &&
                entry.items.map((item) =>{
                  const IconSub = item.logo ? Icons[item.logo] : null;
                  return (<MenuEntry key={item.href} secondary isActive={location.pathname !== "/" ? item.href.indexOf(location.pathname) !== -1 : item.href === location.pathname} style={{ position: 'relative' }}>
                    { (item.href.indexOf('https://') === -1) ?
                      <MenuLink href={item.href} onClick={handleClick}>{item.label}</MenuLink>:
                      (item.href.indexOf('https://midasgold.network') !== -1)  ? <>{item.logo && IconSub && <WrapIconSub><IconSub width="26px" height="20px" mr="8px" /></WrapIconSub> }<MenuLink href={item.href} >{item.label}</MenuLink></> :
                        <MenuLink href={item.href} target="_blank">{item.label}</MenuLink>
                    }
                  </MenuEntry>
                )})}
            </Accordion>
          );
        }
        const isActive =  entry.href !== "/" ? location.pathname.includes(entry.href as string) : entry.href === location.pathname
        const checkLoadPage = (
          location.pathname === '/'
          || location.pathname === '/farms'
          || location.pathname === '/touch'
          || location.pathname === '/reserve-fund'
        )
        const newHref  = checkLoadPage ? entry.href : `https://midasgold.network${entry.href}`
        return (
          <MenuEntry key={entry.label} isActive={isActive} className={calloutClass}>
            <MenuLink href={newHref} onClick={handleClick} >
              {iconElement}
              { (entry.href && entry.href.indexOf('https://') === -1) ?
                <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel> :
                (entry.href && entry.href.indexOf('https://midasgold.network') !== -1)  ? <a href={entry.href} >{entry.label}</a> :
                  <a href={entry.href} target="_blank">{entry.label}</a>
              }
            </MenuLink>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;
