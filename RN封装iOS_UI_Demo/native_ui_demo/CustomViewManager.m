//
//  CustomViewManager.m
//  react_native_packages
//
//  Created by RuweiLi on 2017/7/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CustomViewManager.h"
#import "CustomView.h"

@interface CustomViewManager ()
@property (nonatomic, strong) NSDictionary *viewRegistry;
@end

@implementation CustomViewManager

//设置名称，不会自动删除`RCT`前缀
RCT_EXPORT_MODULE(RCTCustomView)

RCT_EXPORT_VIEW_PROPERTY(title, NSString)

RCT_EXPORT_VIEW_PROPERTY(onClickButton, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(changeColor:(NSInteger)viewTag)
{
  CustomView *view = (CustomView *)[self viewFromTag:viewTag];
  [view performSelectorOnMainThread:@selector(changeColor) withObject:nil waitUntilDone:YES];
}

- (UIView *)view {
  id view = [CustomView create];

  return view;
}

- (UIView *)viewFromTag:(NSInteger)tag {
  return self.viewRegistry[@(tag)];
}

- (RCTViewManagerUIBlock)uiBlockToAmendWithShadowView:(RCTShadowView *)shadowView {
  __weak __typeof__(self) weakSelf = self;
  return ^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry){
    NSLog(@"\n %@",viewRegistry);
    weakSelf.viewRegistry = viewRegistry;
  };
}
@end
