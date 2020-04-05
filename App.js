import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import * as axios from "axios";
import Loading from "./Loading";
import Weather from "./Weather";

const WEATHER = "09b95411bce0553c3c829f020a133297";

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (lat, lon) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER}&units=metric`
    );
    this.setState({ isLoading: false, temp, condition: weather[0].main });
  };

  getLocation = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert("Can't find you");
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}
