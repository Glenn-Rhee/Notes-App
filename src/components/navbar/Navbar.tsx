"use client";
import Humberger from "@/icon/Humberger";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  useDisclosure,
} from "@nextui-org/react";
import FormNotes from "../modal/formNotes";
import Link from "next/link";

export default function NavbarComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar
        isBordered
        className="bg-[#1E1E1E] border-b-2 border-b-white"
        maxWidth="full"
      >
        <NavbarBrand>
          <Link href={"/"}>
            <p className="font-bold text-3xl text-inherit text-white">
              Note&apos;s App
            </p>
          </Link>
        </NavbarBrand>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button size="sm">
                <Humberger />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="New">
                <Button
                  onPress={() => {
                    onOpen();
                  }}
                  color="primary"
                  className="w-full"
                >
                  New
                </Button>
              </DropdownItem>
              <DropdownItem key="archive">Archive</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <FormNotes isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
