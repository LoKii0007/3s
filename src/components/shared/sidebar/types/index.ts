export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  hasDropdown?: boolean;
  isActive?: boolean;
}

export interface SidebarProps {
  activePath?: string;
}
