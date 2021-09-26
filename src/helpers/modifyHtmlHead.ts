export const changeTitle = (pageName: string): void => {
  const title = process.env.REACT_APP_TITLE;
  document.title = `${pageName} | ${title}`;
};
