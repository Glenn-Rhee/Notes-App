"use client";
import Humberger from "@/icon/Humberger";
import { userNotesCollections } from "@/lib/firebase/controller";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = today.toLocaleDateString("id-ID", options);

  return (
    <Navbar
      isBordered
      className="bg-[#1E1E1E] border-b-2 border-b-white"
      maxWidth="full"
    >
      <NavbarBrand>
        <p className="font-bold text-3xl text-inherit text-white">
          Note&apos;s App
        </p>
      </NavbarBrand>
      {/* <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="success"
            variant="solid"
            className="text-white outline-none focus:outline-none hidden md:flex md:w-48 lg:w-60 text-xl font-semibold"
          >
            New
          </Button>
        </NavbarItem>
        <NavbarItem className="">
          <Link href="#">
            <Button
              variant="ghost"
              color="default"
              className="text-white outline-none focus:outline-none hover:text-black hidden md:flex md:w-48 lg:w-60 text-xl font-semibold"
            >
              Archive
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button size="sm">
              <Humberger />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="New">New</DropdownItem>
            <DropdownItem key="archive">Archive</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
