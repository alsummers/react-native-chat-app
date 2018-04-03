import React from "react";
import { TabNavigator } from "react-navigation";

import Channels from '../channels/index'
import Inbox from '../inbox/index'

const Home = TabNavigator(

  {
    Channels: { screen: Channels },
    Inbox: { screen: Inbox }
  },
  {
    tabBarPosition: "bottom",
    initialRouteName: "Channels"
  }
);

export default Home;