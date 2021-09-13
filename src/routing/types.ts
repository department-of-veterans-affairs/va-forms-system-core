export interface RouterProps {
  children: Array<PageType>;
  basename: string;
}

export interface Routable {
  path: string;
}

export interface PageType extends React.Component {
  props: Routable & {
    exact?: boolean;
    children: React.Component;
    title: string;
  };
}
