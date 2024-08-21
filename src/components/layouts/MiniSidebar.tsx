import { FileUp, PanelsTopLeft, Shapes, Type, UploadCloud } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const SIZE = 26;
const SIDEBAR_ICONS = [
    {
        label: 'Design',
        icon: <PanelsTopLeft size={SIZE} />
    },
    {
        label: 'Elements',
        icon: <Shapes size={SIZE} />
    },
    {
        label: 'Text',
        icon: <Type size={SIZE} />
    },
    {
        label: 'Uploads',
        icon: <UploadCloud size={SIZE} />
    },
    {
        label: 'Export',
        icon: <FileUp size={SIZE} />
    },
];

const MiniSidebar = () => {
    return (
        <ScrollArea className="bg-gray-900 overflow-y-auto">
            <div className="h-full text-gray-400 flex flex-col">
                {
                    SIDEBAR_ICONS.map(({ label, icon }, i: number) => (
                        <button key={i} className={`${i === 0 ? 'bg-gray-800' : 'bg-gray-900'} p-4 inline-flex flex-col items-center hover:bg-transparent hover:text-white`}>
                            {icon}
                            <p className="mt-2 text-xs font-light">{label}</p>
                        </button>
                    ))
                }
            </div>
        </ScrollArea>
    );
};

export default MiniSidebar;