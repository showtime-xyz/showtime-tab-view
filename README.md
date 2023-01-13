<img align="right" width="160" alt="showtime tab view logo" src="./example/assets/icon.png" />
<div >
  <h1>Showtime Tab View</h1>

</div>

A react native component, support collapse header and custom refresh control, power by [Reanimated v2](https://docs.swmansion.com/react-native-reanimated/) & [GestureHandler V2](https://docs.swmansion.com/react-native-gesture-handler/docs/).
<video align="right" width="160" alt="This library helped you? Consider sponsoring!" src="https://user-images.githubusercontent.com/37520667/212389901-764422ef-cf1b-48fc-87af-cfbe7ad1f6e2.mp4" />

## What

This is a react native tab view component, it wraps gestures and animations on top of [react-native-tab-view](https://github.com/react-navigation/react-navigation/tree/main/packages/react-native-tab-view#readme), source code in [here](https://github.com/showtime-xyz/showtime-frontend/tree/staging/packages/design-system/collapsible-tab-view) before.

you can see this [context on Twitter](https://twitter.com/alan_toa/status/1564429150152458241).

## Features

- Collapse header.
- Support [FlashList](https://shopify.github.io/flash-list/). \*(see [this](./example/src/tab-flash-list/index.tsx))
- Custom fresh control.
- Support bounces effect on iOS.
- Support iOS & Android & Web.
- Zoom header when pull refresh. \*(see this [thread](https://github.com/showtime-xyz/showtime-frontend/discussions/1471))

## Installation

First things you should follow installation instructions of:

- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [react-native-gesture-handler v2](https://docs.swmansion.com/react-native-gesture-handler/)
- [react-native-pager-view](https://docs.expo.dev/versions/latest/sdk/view-pager/)

and then

```sh
yarn add showtime-tab-view
```

## Example

- [basic example.](./example//src/example.tsx)
- [zoom effect when pull refresh example.](https://github.com/Daavidaviid/showtime-scrollview-with-zoom-pull-to-refresh)
- [showtime profile example](https://github.com/showtime-xyz/showtime-frontend/tree/staging/packages/app/components/profile)
- ...more will come soon!

## Usage

mostly API is same with [react-native-tab-view](https://github.com/react-navigation/react-navigation/tree/main/packages/react-native-tab-view#readme), I just added some props on top of it, basic:

```tsx
import React, { useCallback, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Route, TabView } from "showtime-tab-view";
import { TabFlashList } from "./tab-flash-list";
const StatusBarHeight = StatusBar.currentHeight ?? 0;
const TabScene = ({ route }: any) => {
  return (
    <TabFlashList
      index={route.index}
      data={new Array(20).fill(0)}
      estimatedItemSize={60}
      renderItem={({ index }) => {
        return (
          <View
            style={{
              height: 60,
              backgroundColor: "#fff",
              marginBottom: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{`${route.title}-Item-${index}`}</Text>
          </View>
        );
      }}
    />
  );
};

export function Example() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [routes] = useState<Route[]>([
    { key: "like", title: "Like", index: 0 },
    { key: "owner", title: "Owner", index: 1 },
    { key: "created", title: "Created", index: 2 },
  ]);
  const [index, setIndex] = useState(0);
  const animationHeaderPosition = useSharedValue(0);
  const animationHeaderHeight = useSharedValue(0);

  const renderScene = useCallback(({ route }: any) => {
    switch (route.key) {
      case "like":
        return <TabScene route={route} index={0} />;
      case "owner":
        return <TabScene route={route} index={1} />;
      case "created":
        return <TabScene route={route} index={2} />;
      default:
        return null;
    }
  }, []);

  const onStartRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log("onStartRefresh");
      setIsRefreshing(false);
    }, 300);
  };
  const renderHeader = () => (
    <View style={{ height: 300, backgroundColor: "#000" }}></View>
  );
  return (
    <TabView
      onStartRefresh={onStartRefresh}
      isRefreshing={isRefreshing}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      lazy
      renderScrollHeader={renderHeader}
      minHeaderHeight={44 + StatusBarHeight}
      animationHeaderPosition={animationHeaderPosition}
      animationHeaderHeight={animationHeaderHeight}
    />
  );
}
```

## API

...

Will come soon! 🔜

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

Special thanks [@Daavidaviid](https://github.com/Daavidaviid) to try [zoom header effect when pull to refresh](https://github.com/showtime-xyz/showtime-frontend/discussions/1471).

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
