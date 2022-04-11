export const buildPath = (...args: string[]): string => {
  return args
    .map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/[/]*$/g, '');
      } else {
        return part.trim().replace(/(^[/]*|[/]*$)/g, '');
      }
    })
    .filter((x) => x.length)
    .join('/');
};

export const buildRelativePath = (...args: string[]): string => {
  const path = buildPath(...args);

  return path.startsWith('/') ? path : `/${path}`;
};
