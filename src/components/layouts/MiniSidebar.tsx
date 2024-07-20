import { FileUp, PanelsTopLeft, Shapes, Type, UploadCloud } from "lucide-react";

const SIDEBAR_ICONS = [
    {
        label: 'Design',
        icon: <PanelsTopLeft size={32} />
    },
    {
        label: 'Elements',
        icon: <Shapes size={32} />
    },
    {
        label: 'Text',
        icon: <Type size={32} />
    },
    {
        label: 'Uploads',
        icon: <UploadCloud size={32} />
    },
    {
        label: 'Export',
        icon: <FileUp size={32} />
    },
];

const MiniSidebar = () => {
    return (
        <div className="h-full bg-gray-900 text-gray-400 flex flex-col space-y-4">
            {
                SIDEBAR_ICONS.map(({ label, icon }, i: number) => (
                    <button key={i} className={`${i === 0 ? 'bg-gray-800' : 'bg-gray-900'} p-4 inline-flex flex-col items-center hover:bg-transparent hover:text-white`}>
                        {icon}
                        <p className="mt-2 text-xs font-light">{label}</p>
                    </button>
                ))
            }
        </div>
    );
};

export default MiniSidebar;