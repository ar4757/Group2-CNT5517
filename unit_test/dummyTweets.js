const dummy_tweets = [{ "Tweet Type" : "Identity_Thing","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "trial1","Model" : "Raspberry Pi 3b+","Vendor" : "","Owner" : "Heran","Description" : "This is Heran's Thing","OS" : "Raspbian" },
{ "Tweet Type" : "Identity_Thing","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "trial1","Model" : "Raspberry Pi 3b+","Vendor" : "","Owner" : "Heran","Description" : "my first trial with laser emitter","OS" : "Raspbian" },
{ "Tweet Type" : "Identity_Language","Thing ID" :"HeranSS","Space ID" : "G2-Heran","Network Name" : "Frontier6512_5G","Communication Language" : "","IP" : "105.110.103.0","Port" : "6668" }, { "Tweet Type" : "Identity_Language","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Network Name" : "Frontier6512_5G","Communication Language" : "","IP" : "105.110.103.0","Port" : "6668" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "laser emitter","ID" : "laser_emitter","Type" : "Built-In","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "laser emitter","ID" : "laser_emitter","Type" : "Built-In","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "","ID" : "tiltSwitch","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "","ID" : "tiltSwitch","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "","ID" : "pushButton","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "","ID" : "pushButton","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
 { "Tweet Type" : "Identity_Entity","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "","ID" : "LED","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "HeranSS","Space ID" : "G2-Heran","Name" : "","ID" : "LED","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Service","Name" : "turnLaser","Thing ID" : "HeranSS","Entity ID" : "laser_emitter","Space ID" : "G2-Heran","Vendor" : "","API" : "turnLaser:[isTurnOn,int, NULL]:(NULL)","Type" : "Action","AppCategory" : "Lighting","Description" : "","Keywords" : "turn on of turn off the laser" },
  { "Tweet Type" : "Service","Name" : "readTiltSwitch","Thing ID" : "HeranSS","Entity ID" : "tiltSwitch","Space ID" : "G2-Heran","Vendor" : "","API" : "readTiltSwitch:[NULL]:(isOn,int, NULL)","Type" : "Action","AppCategory" : "Safety","Description" : "","Keywords" : "" },
  { "Tweet Type" : "Service","Name" : "push","Thing ID" : "HeranSS","Entity ID" : "pushButton","Space ID" : "G2-Heran","Vendor" : "","API" : "push:[NULL]:(isPushed,int, NULL)","Type" : "Action","AppCategory" : "Automation","Description" : "","Keywords" : "" },
  { "Tweet Type" : "Service","Name" : "turnLED","Thing ID" : "HeranSS","Entity ID" : "LED","Space ID" : "G2-Heran","Vendor" : "","API" : "turnLED:[\"isTurnedOn\",int, NULL]:(NULL)","Type" : "","AppCategory" : "","Description" : "","Keywords" : "" },
  { "Tweet Type" : "Service","Name" : "turnLED","Thing ID" : "HeranSS","Entity ID" : "LED","Space ID" : "G2-Heran","Vendor" : "","API" : "turnLED:[\"isTurnedOn\",int, NULL]:(NULL)","Type" : "","AppCategory" : "","Description" : "","Keywords" : "" },
  { "Tweet Type" : "Relationship","Name" : "Morning Breakfast","Thing ID" : "HeranSS","Entity ID" : "laser_emitter","Space ID" : "G2-Heran","Vendor" : "","Type" : "drive","Category" : "Cooperative","Description" : "","FS name" : "readSth", "SS name" : "turnLED" },
  { "Tweet Type" : "Relationship","Name" : "Coffee Machine","Thing ID" : "HeranSS","Entity ID" : "laser_emitter","Space ID" : "G2-Heran","Vendor" : "","Type" : "drive","Category" : "Cooperative","Description" : "","FS name" : "readTiltSwitch", "SS name" : "pushSth" }
];

export {
  dummy_tweets
}
