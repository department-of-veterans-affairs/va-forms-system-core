export interface RouterProps {
  children: Array<PageType>;
  basename: string;
}

export interface Routable {
  path: string;
}

export interface PageProps {
  children: JSX.Element[];
  title: string;
  path: string;
}

export interface PageType extends React.Component {
  props: Routable & {
    exact?: boolean;
    children: JSX.Element[] | JSX.Element;
    title: string;
  };
}
