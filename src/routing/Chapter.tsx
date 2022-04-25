import React from 'react';
import { useParams, Link, Outlet, Route, Routes } from 'react-router-dom';
import { ChapterProps } from './types';
import Page from './Page';

const pageData = [
  {
    number: 1,
    name: 'Page 1',
  },
  {
    number: 2,
    name: 'Page 2',
  },
  {
    number: 3,
    name: 'Page 3',
  },
  {
    number: 4,
    name: 'Page 4',
  },
  {
    number: 5,
    name: 'Page 5',
  },
];

/**
 * Renders the chapter contents
 *
 * @beta
 */
export default function Chapter(props: ChapterProps): JSX.Element {
  let params = useParams();

  console.log(props);
  console.log(params);

  return (
    <div>
      <h1>{props.title}</h1>

      <h2>{params.chapterId}</h2>

      {pageData.map((page) => (
        <Link to={`pages/${page.number}`} key={page.number}>
          <h3>{page.name}</h3>
        </Link>
      ))}

      <Outlet />
    </div>
  );

  // return (
  //   <div>
  //     <Link to="page/1">Go to Page 1</Link>
  //     <Routes>
  //       <Route path="pages/*" element={ <Page title="Page 1" /> } />
  //     </Routes>
  //   </div>

  // )
}
