package com.outlook.liruwei0109.rn_android_ui;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by liruwei on 2017/8/1.
 */

public class CustomView extends LinearLayout {
    private String title = "";
    private TextView titleView;
    private Button button;
    private View colorView;
    private int colorIndex = 0;

    public CustomView(Context context) {
        super(context);
        LayoutInflater.from(context).inflate(R.layout.custom_view_layout, this);
        titleView = (TextView) this.findViewById(R.id.title_text_view);
        colorView = this.findViewById(R.id.view_color);

        button = (Button) this.findViewById(R.id.button_alert);
        button.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                WritableMap event = Arguments.createMap();
                event.putString("title", title);
                ReactContext reactContext = (ReactContext)getContext();
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(),
                        "topChange",
                        event);
            }
        });
    }

    public void changeColor() {
        int[] colors = {Color.BLUE,Color.RED,Color.GREEN};
        colorView.setBackgroundColor(colors[colorIndex]);
        colorIndex++;
        if (colorIndex>=colors.length) colorIndex = 0;
    }

    public void setTitle(String newTitle) {
        this.title = newTitle;
        titleView.setText(newTitle);
    }

    private final Runnable measureAndLayout = new Runnable() {
        @Override
        public void run() {
            measure(
                    MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
            layout(getLeft(), getTop(), getRight(), getBottom());
        }
    };

    @Override
    public void requestLayout() {
        super.requestLayout();
        // The spinner relies on a measure + layout pass happening after it calls requestLayout().
        // Without this, the widget never actually changes the selection and doesn't call the
        // appropriate listeners. Since we override onLayout in our ViewGroups, a layout pass never
        // happens after a call to requestLayout, so we simulate one here.
        post(measureAndLayout);
    }
}
