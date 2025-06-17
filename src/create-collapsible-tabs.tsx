import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
  TabViewProps,
} from "react-native-tab-view";

import { GestureContainer, GestureContainerRef } from "./gesture-container";
import type {
  CollapsibleHeaderProps,
  Route,
  TabViewCustomRenders,
} from "./types";

export type CollapsibleTabViewProps<T extends Route> = Partial<
  TabViewProps<T>
> &
  Pick<TabViewProps<T>, "onIndexChange" | "navigationState" | "renderScene"> &
  CollapsibleHeaderProps<T>;

export type ForwardTabViewProps<T extends Route> =
  CollapsibleTabViewProps<T> & {
    forwardedRef: React.ForwardedRef<CollapsibleTabViewRef>;
    Component: React.PropsWithRef<typeof TabView>;
  };

export type CollapsibleTabViewRef = {
  setCurrentIndex: (index: number) => void;
  scrollCurrentTabTo: (offsetY: number, animated?: boolean) => void;
  isSceneReady: () => boolean;
  getCurrentScrollRef: () => any;
  scrollCurrentTabToTop: (index: number, animated?: boolean) => void;
};

export function createCollapsibleTabsComponent<T extends Route>(
  Component: React.PropsWithRef<typeof TabView>
) {
  return React.forwardRef<CollapsibleTabViewRef, CollapsibleTabViewProps<T>>(
    function tabView(props, ref) {
      return (
        <CollapsibleHeaderTabView
          {...props}
          forwardedRef={ref}
          Component={Component}
        />
      );
    }
  );
}

function CollapsibleHeaderTabView<T extends Route>({
  forwardedRef,
  ...props
}: ForwardTabViewProps<T>) {
  const gestureContainerRef = useRef<GestureContainerRef>(null);
  const initialPageRef = useRef(props.navigationState.index);

  useEffect(() => {
    gestureContainerRef.current?.setCurrentIndex(props.navigationState.index);
  }, [props.navigationState.index]);

  useImperativeHandle(forwardedRef, () => {
    const innerRef = gestureContainerRef.current;
    if (!innerRef) {
      return {
        setCurrentIndex: () => {},
        scrollCurrentTabTo: () => {},
        isSceneReady: () => false,
        getCurrentScrollRef: () => null,
        scrollCurrentTabToTop: () => {},
      };
    }
    return {
      scrollCurrentTabToTop: innerRef.scrollCurrentTabToTop,
      setCurrentIndex: innerRef.setCurrentIndex,
      scrollCurrentTabTo: innerRef.scrollCurrentTabTo,
      isSceneReady: innerRef.isSceneReady,
      getCurrentScrollRef: innerRef.getCurrentScrollRef,
    };
  }, [gestureContainerRef.current]);
  const renderTabBar = useCallback(
    (
      tabbarProps: SceneRendererProps & {
        navigationState: NavigationState<T>;
      }
    ) => {
      return props?.renderTabBar ? (
        props.renderTabBar(tabbarProps)
      ) : (
        <TabBar {...tabbarProps} />
      );
    },
    [props]
  );

  const renderTabView = (e: TabViewCustomRenders) => {
    const { Component, renderScene, navigationState, ...restProps } = props;
    const routesKey = useMemo(() => {
      return navigationState.routes.map((r) => r.key).join("_");
    }, [navigationState.routes]);

    return (
      <Component
        {...restProps}
        key={routesKey}
        navigationState={navigationState}
        renderTabBar={(
          tabbarProps: SceneRendererProps & {
            navigationState: NavigationState<T>;
          }
        ) => e.renderTabBarContainer(renderTabBar(tabbarProps))}
        renderScene={(props: any) =>
          e.renderSceneHeader(renderScene(props), props)
        }
      />
    );
  };

  return (
    //@ts-ignore
    <GestureContainer
      ref={gestureContainerRef}
      initialPage={initialPageRef.current}
      renderTabView={renderTabView}
      {...props}
    />
  );
}
