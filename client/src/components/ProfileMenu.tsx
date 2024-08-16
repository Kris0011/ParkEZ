import { Avatar, AvatarImage  } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogut";

export default function ProfileMenu() {

    const  { user } = useSelector((state: any) => state.user);
    // console.log(user);

    const { logout } = useLogout();

  return (
    <div className=" pl-10">
      <DropdownMenu >
        <DropdownMenuTrigger>
            <Button variant="secondary" className="h-[3rem]">
                <Avatar className=" border-slate-500 border-2 mr-4">
                    <AvatarImage src={user?.photoURL} alt={user?.displayName}   className=""/>
                    {/* <h1>{user?.email}</h1> */}
                    {/* <p>{user?.photoURL}</p> */}
                </Avatar>
                {user?.displayName}
            </Button>
        

            </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
        
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}