const DEFAULT_PAGE_TITLE = "메이플 정산 시스템";

export const getPageTitle = (title?: string) => {
  return `${DEFAULT_PAGE_TITLE}${title ? ` | ${title}` : ""}`;
};
