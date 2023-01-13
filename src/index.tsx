import { TabView as RNTabView } from "react-native-tab-view";

import { createCollapsibleTabsComponent } from "./create-collapsible-tabs";

export { TabFlatList, TabScrollView, TabSectionList } from "./scrollable-view";

export * from "./create-collapsible-tabs";
export * from "./scene";
export * from "./types";
export type {
  TabScrollViewProps,
  TabFlatListProps,
  TabSectionListProps,
} from "./scrollable-view";
export { useHeaderTabContext } from "./context";

export const TabView = createCollapsibleTabsComponent<any>(RNTabView);
