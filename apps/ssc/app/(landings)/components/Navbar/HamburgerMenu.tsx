"use client";

import Hamburger from "hamburger-react";

const HamburgerMenu = () => {
  let menu: HTMLDivElement;
  let navbar: HTMLElement;

  const gatherElements = () => {
    menu = document.getElementById("hamburger-menu") as HTMLDivElement;
    navbar = document.getElementsByTagName("nav")[0] as HTMLElement;
  };

  const openMenu = () => {
    gatherElements();
    navbar.style.position = "fixed";
    menu.style.display = "flex";
  };

  const closeMenu = () => {
    gatherElements();
    navbar.style.position = "relative";
    menu.style.display = "none";
  };

  return (
    <Hamburger
      onToggle={(toggled) => {
        if (toggled) openMenu();
        else closeMenu();
      }}
    />
  );
};

export default HamburgerMenu;
