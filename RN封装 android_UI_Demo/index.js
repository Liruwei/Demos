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
    TouchableOpacity
} from 'react-native';

export default class Demo extends React.Component{

  static defaultProps = {};
  static propTypes = {};

  constructor(props) {
      super(props);
      this.state = {
        title: 'Title',
        show: true,
      };
  }

  render() {
      return(
        <View style={{flex:1}}>
          <View style={{flex:1,backgroundColor:'rgba(0,255,0,0.5)'}}>
            <Text style={{fontSize:20,padding:30,justifyContent:'center',alignItems:'center'}}>React-Native</Text>
            <View style={{paddingBottom:10}}>
              <TouchableOpacity onPress={()=>{
                this._customView.changeColor();
              }}>
                <Text style={{padding:5,textAlign:'center'}}>修改颜色</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>{
              this.setState({title:`${Math.random()}`});
            }}>
              <Text style={{padding:5,textAlign:'center'}}>改变标题</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:2,backgroundColor:'rgba(0,0,255,0.5)'}}>
            <Text style={{fontSize:20,padding:30}}>Native-UI</Text>
            {this.state.show &&
              <NativeComponent
                style={{flex:1}}
                ref={r=>{this._customView = r;}}
                title={this.state.title}
                onClickButton={e=>{
                  let result = e.nativeEvent;
                  alert(result.title);
                }}
              />
            }
          </View>
        </View>
      )
  }
}

class NativeComponent extends React.Component{
  static propTypes =  {
    title: PropTypes.string,
    onClickButton: PropTypes.func,
    ...View.propTypes // 包含默认的View的属性
  }

  changeColor() {
    NativeModules.CustomView.changeColor(this._UI._rootNodeID);
  }

  render() {
    let {onClickButton} = this.props;
    return <RCTCustomView {...this.props} ref={r=>{this._UI = r;}} onChange={(e)=>{
      onClickButton && onClickButton(e);
    }}/>
  }
}

const RCTCustomView = requireNativeComponent('RCTCustomView',NativeComponent);
