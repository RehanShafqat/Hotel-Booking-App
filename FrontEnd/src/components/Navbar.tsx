import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
const Navbar = () => {
  return (
    <div>
      <Drawer direction="bottom">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <div className="min-h-[50vh]">Hello</div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Navbar;
