//
//  CustomView.h
//  react_native_packages
//
//  Created by RuweiLi on 2017/7/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@interface CustomView : UIView

+ (instancetype)create;
- (void)changeColor;

@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) RCTBubblingEventBlock onClickButton;

@end
