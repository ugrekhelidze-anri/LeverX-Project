export const copyLink = (currentUrl: string) => {
  navigator.clipboard.writeText(currentUrl);
};
