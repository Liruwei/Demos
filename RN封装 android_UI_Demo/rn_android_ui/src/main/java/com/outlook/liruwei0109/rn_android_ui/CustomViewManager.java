package com.outlook.liruwei0109.rn_android_ui;


import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;


import java.util.HashMap;
/**
 * Created by liruwei on 2017/8/1.
 */

public class CustomViewManager extends SimpleViewManager<CustomView> {

    static HashMap _views = new HashMap();

    public static final String REACT_CLASS = "RCTCustomView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public CustomView createViewInstance(ThemedReactContext context) {
        return new CustomView(context);
    }

    @ReactProp(name = "title")
    public void setTitle(CustomView view, String title) {
        view.setTitle(title);
    }

    @ReactMethod
    public void changeColor(Integer viewId) {
        final CustomView view = (CustomView) _views.get(viewId);
        if (view instanceof  CustomView) {
            view.post(new Runnable() {
                @Override
                public void run() {
                    view.changeColor();
                }
            });
        }
    }

    @Override
    protected void onAfterUpdateTransaction(CustomView view) {
        _views.put(view.getId(),view);
    }

    @Override
    public void onDropViewInstance(CustomView view) {
        _views.remove(view.getId());
    }
}
