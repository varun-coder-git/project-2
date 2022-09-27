package com.smartcities.logindemo;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.Plugin;
//import com.capacitorjs.plugins.filesystem;
import java.util.ArrayList;


public class MainActivity extends BridgeActivity {
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(GoogleAuth.class);
        registerPlugin(com.getcapacitor.community.facebooklogin.FacebookLogin.class);
    }
}
