import React from "react";
import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";

interface IIcon {
  color: string;
  size: number;
}

const HomeIcon = ({ color, size }: IIcon) => (
  <IconSymbol size={size} name="house.fill" color={color} />
);

const SearchIcon = ({ color, size }: IIcon) => (
  <EvilIcons name="search" size={size} color={color} />
);

const ReelsIcon = ({ color, size }: IIcon) => (
  <MaterialIcons name="video-collection" size={size} color={color} />
);

const ShoppingIcon = ({ color, size }: IIcon) => (
  <Feather name="shopping-bag" size={size} color={color} />
);

const ProfileIcon = ({ color, size }: IIcon) => (
  <Feather name="user" size={size} color={color} />
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarItemStyle: {
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen name="home" options={{ tabBarIcon: HomeIcon }} />
      <Tabs.Screen name="search" options={{ tabBarIcon: SearchIcon }} />
      <Tabs.Screen name="reels" options={{ tabBarIcon: ReelsIcon }} />
      <Tabs.Screen name="shopping" options={{ tabBarIcon: ShoppingIcon }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ProfileIcon }} />
    </Tabs>
  );
};

export default TabsLayout;
