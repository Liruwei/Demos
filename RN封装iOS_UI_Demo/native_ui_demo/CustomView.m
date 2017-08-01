//
//  CustomView.m
//  react_native_packages
//
//  Created by RuweiLi on 2017/7/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CustomView.h"

@interface CustomView ()
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UIView *colorView;
@end

@implementation CustomView
+ (instancetype)create {
  return [[NSBundle mainBundle] loadNibNamed:@"CustomView" owner:nil options:nil].firstObject;
}

- (void)setTitle:(NSString *)title {
  _title = title;
  self.titleLabel.text = title;
}

- (void)changeColor {
  NSArray *colors = @[[UIColor redColor],[UIColor greenColor],[UIColor blueColor],[UIColor grayColor],[UIColor purpleColor]];
  NSInteger index = arc4random_uniform((int)colors.count);
  self.colorView.backgroundColor = colors[index];
}

- (IBAction)alert:(id)sender {
  if (self.onClickButton) {
    self.onClickButton(@{@"title":self.title?self.title:[NSNull null]});
  }
}

@end
