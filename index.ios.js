var React = require('react-native');
var {
  AppRegistry,
  MapView,
  View,
  Text,
  StyleSheet
} = React
var mapApi = require('./src/map-api');
var Switch = require('react-native-material-switch');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      pin: {
        latitude: 0,
        longitude: 0,
      },
      city: '',
      temperature: '',
      description: '',
      updatesEnabled: true
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <MapView
          annotations={[this.state.pin]}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}>
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
        <View style={styles.switchWrapper}>
          <Switch
          onChangeState={this.onSwitchChange}
          />
          <Text style={styles.text}>{this.state.updatesEnabled ? "Updates ON" : "Updates OFF"}</Text>
        </View>
      </View>
    );
  },
  onRegionChangeComplete: function(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });
    if (this.state.updatesEnabled){
    mapApi(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
    }
  },
  onSwitchChange: function(state) {
    this.setState({
      updatesEnabled: !state
    })
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 8,
    marginTop: 30
  },
  textWrapper: {
    flex: 2,
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
  },
  switchWrapper: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: 10
}
});

AppRegistry.registerComponent('weather', () => Weather);
