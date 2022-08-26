type SubItem = {
  name: string;
  link: string;
  matchLinks: string[] | [];
  ignoreLinks?: string[] | [];
};

export type DrawerItemProps = {
  name: string;
  link?: string;
  icon: JSX.Element;
  subItems?: SubItem[] | [];
  matchLinks?: string[] | [];
  ignoreLinks?: string[] | [];
  strict?: boolean;
};

export type ChildLinks = {
  name: string;
  link: string;
  matchLinks: string[];
};
