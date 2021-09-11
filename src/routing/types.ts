export interface PageType extends React.Component {
  props: {
    path: string; // Used by the Router directly
    exact?: boolean;
    children: React.Component;
    title: string;
  };
}
