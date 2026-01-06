export const getActiveTab = (url: string): "settings" | "address" => {
  // if pathname is permission we enable settings tab
  if (url === "/permissions") {
    return "settings";
  } // else address tab is eanbled
  return "address";
};
