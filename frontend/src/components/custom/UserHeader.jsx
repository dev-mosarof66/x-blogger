
import ThemeSetter from "./ThemeSetter";

const AdminHeader = () => {
  return (
    <div className="w-full flex justify-end gap-4 items-center px-4 sm:px-8 border-b border-purple-600/20 pb-1">
      <ThemeSetter />
    </div>
  );
};

export default AdminHeader;
