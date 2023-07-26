import { useRouter } from "next/router";
// import { BsTwitter } from "react-icons/bs";
import { TbHexagonLetterU, TbHexagonLetterM, TbHexagonLetterX} from "react-icons/tb";

const SidebarLogo = () => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push('/')}
      className="
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <aside className="text-4xl flex flex-row">
      <TbHexagonLetterU color="white" size={28} />
          <TbHexagonLetterM color="white" size={28} />
          <TbHexagonLetterX color="white" size={28} />
          </aside>
    </div>
  );
};

export default SidebarLogo;
