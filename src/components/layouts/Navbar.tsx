import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
    return (
        <div className="px-4 py-2 bg-primary text-primary-foreground">
            <div className="flex justify-between">
                <div className="inline-flex items-center gap-x-4 xl:gap-x-6">
                    <a href="#" className="font-mono">Kanvas</a>
                </div>
                <div className="inline-flex items-center">
                    <Avatar className="bg-primary">
                        <AvatarFallback className="w-full text-primary-foreground flex justify-center items-center">DF</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default Navbar;