import type React from "react";
import type { ComponentClass } from "react";
import type { ScrollViewProps } from "react-native";

import type { NativeGesture } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import type {
  TabViewProps,
  Route as TabViewRoute,
} from "react-native-tab-view";
import type { SCROLLABLE_STATE } from "./constants";

export type Route = TabViewRoute & {
  index: number;
  subtitle?: string | number;
};

export enum RefreshTypeEnum {
  Idle,
  Pending,
  Success,
  Refreshing,
  Finish,
  Cancel,
}

export type CollapsibleHeaderProps<T extends Route> = {
  initHeaderHeight?: number;
  renderScrollHeader?: () => React.ReactElement | null;
  overridenShareAnimatedValue?: SharedValue<number>;
  overridenTranslateYValue?: SharedValue<number>;
  initTabbarHeight?: number;
  minHeaderHeight?: number;
  overflowHeight?: number;
  headerRespond?: boolean;
  scrollEnabled?: boolean;
  isRefreshing?: boolean;
  onStartRefresh?: () => void;
  renderRefreshControl?: (
    refreshProps: RefreshControlProps
  ) => React.ReactElement;
  refreshHeight?: number;
  overflowPull?: number;
  pullExtendedCoefficient?: number;
  animationHeaderPosition?: SharedValue<number>;
  animationHeaderHeight?: SharedValue<number>;
  panHeaderMaxOffset?: number;
  onPullEnough?: () => void;
  refreshControlColor?: string;
  refreshControlTop?: number;
  emptyBodyComponent?: JSX.Element | null;
  renderSceneHeader?: (props: T) => JSX.Element | null;
  /**
   * Enabling this option will prevent Reanimated & GestureHandler from crashing sometimes in debug mode.
   */
  enableGestureRunOnJS?: boolean;
};

export type TabViewCustomRenders = {
  renderTabBarContainer: (children: any) => JSX.Element;
  renderSceneHeader: (children: any, props: any) => JSX.Element;
};

export type GestureContainerProps<T extends Route> = Pick<
  TabViewProps<Route>,
  "navigationState"
> &
  CollapsibleHeaderProps<T> & {
    initialPage: number;
    renderTabView: (e: TabViewCustomRenders) => JSX.Element;
  };

export interface RefreshControlProps {
  refreshValue: SharedValue<number>;
  refreshType: SharedValue<RefreshTypeEnum>;
  progress: SharedValue<number>;
  refreshControlColor?: string;
}
export type SceneProps<P extends object> = P & {
  ContainerView: any;
  forwardedRef: any;
  index: number;
  useExternalScrollView?: boolean;
} & ScrollViewProps;

export type UpdateSceneInfoParams = {
  scrollRef: any;
  index: number;
  scrollY: SharedValue<number>;
};

export type ScrollableView<T> = ComponentClass<T>;

export type ForwardRefType<T> =
  | ((instance: T | null) => void)
  | React.MutableRefObject<T | null>
  | null;

export type GesturePanContext = {
  startY: SharedValue<number>;
  basyY: SharedValue<number>;
};
export type TabHeaderContext = {
  isSlidingHeader: SharedValue<boolean>;
  shareAnimatedValue: SharedValue<number>;
  isStartRefreshing: SharedValue<boolean>;
  minHeaderHeight: number;
  tabbarHeight: number;
  headerHeight: number;
  scrollStickyHeaderHeight: number;
  refreshHeight: number;
  overflowPull: number;
  pullExtendedCoefficient: number;
  headerTrans: SharedValue<number>;
  expectHeight: number;
  refHasChanged: (ref: NativeGesture) => void;
  curIndexValue: SharedValue<number>;
  updateSceneInfo: (e: UpdateSceneInfoParams) => void;
  scrollViewPaddingTop: number;
  animatedScrollableState: SharedValue<SCROLLABLE_STATE>;
  disableBounces?: SharedValue<boolean>;
} | null;
