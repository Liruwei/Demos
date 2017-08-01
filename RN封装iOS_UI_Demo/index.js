/* @flow */

import React, {
    Component,
    PropTypes,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    requireNativeComponent,
    Button,
    NativeModules,
} from 'react-native';

export default class Demo extends React.Component{

  static defaultProps = {};
  static propTypes = {};

  constructor(props) {
      super(props);
      this.state = {
        title: 'Title'
      };
  }
  
  render() {
      return(
        <View style={{flex:1}}>
          <View style={{flex:1,backgroundColor:'rgba(0,255,0,0.5)'}}>
            <Text style={{fontSize:20,padding:30}}>React-Native</Text>
            <Button title="修改颜色" color="black" style={{paddingBottom:10}}
              onPress={()=>{
                this._customView.changeColor();
              }}
            />
            <Button title="改变标题" color="black"  style={{paddingBottom:10}}
              onPress={()=>{
                this.setState({title:`${Math.random()}`});
              }}
            />
          </View>
          <View style={{flex:2,backgroundColor:'rgba(0,0,255,0.5)'}}>
            <Text style={{fontSize:20,padding:30}}>Native-UI</Text>
            <NativeComponent
              style={{flex:1}}
              ref={r=>{this._customView = r;}}
              title={this.state.title}
              onClickButton={e=>{
                let result = e.nativeEvent;
                alert(result.title);
              }}
            />
          </View>
        </View>
      )
  }
}

class NativeComponent extends React.Component{
  static propTypes = {
    title: PropTypes.string,
    onClickButton: PropTypes.func,
  };

  changeColor() {
    NativeModules.CustomView.changeColor(this._UI._rootNodeID);
  }

  render() {
    return <NativeUI {...this.props} ref={r=>{this._UI = r;}}/>
  }
}

const NativeUI = requireNativeComponent('RCTCustomView',NativeComponent);
