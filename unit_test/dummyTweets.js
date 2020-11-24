const dummy_tweets = [{ "Tweet Type" : "Identity_Thing","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "trial1","Model" : "Raspberry Pi 3b+","Vendor" : "","Owner" : "Heran","Description" : "my first trial with laser emitter","OS" : "Raspbian" },
{ "Tweet Type" : "Identity_Thing","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "trial1","Model" : "Raspberry Pi 3b+","Vendor" : "","Owner" : "Heran","Description" : "my first trial with laser emitter","OS" : "Raspbian" },
{ "Tweet Type" : "Identity_Language","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Network Name" : "Frontier6512_5G","Communication Language" : "","IP" : "105.110.103.0","Port" : "6668" }, { "Tweet Type" : "Identity_Language","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Network Name" : "Frontier6512_5G","Communication Language" : "","IP" : "105.110.103.0","Port" : "6668" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "laser emitter","ID" : "laser_emitter","Type" : "Built-In","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "laser emitter","ID" : "laser_emitter","Type" : "Built-In","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "","ID" : "tiltSwitch","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "","ID" : "tiltSwitch","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "","ID" : "pushButton","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "","ID" : "pushButton","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
 { "Tweet Type" : "Identity_Entity","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "","ID" : "LED","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Identity_Entity","Thing ID" : "MySmartThing1","Space ID" : "HeranSmartSpace","Name" : "","ID" : "LED","Type" : "","Owner" : "","Vendor" : "","Description" : "" },
{ "Tweet Type" : "Service","Name" : "turnLaser","Thing ID" : "MySmartThing1","Entity ID" : "laser_emitter","Space ID" : "HeranSmartSpace","Vendor" : "","API" : "turnLaser:[isTurnOn,int, NULL]:(NULL)","Type" : "Action","AppCategory" : "Lighting","Description" : "","Keywords" : "turn on of turn off the laser" },
  { "Tweet Type" : "Service","Name" : "turnLED","Thing ID" : "MySmartThing1","Entity ID" : "laser_emitter","Space ID" : "HeranSmartSpace","Vendor" : "","API" : "turnLaser:[isTurnOn,int, NULL]:(NULL)","Type" : "Action","AppCategory" : "Lighting","Description" : "","Keywords" : "turn on of turn off the laser" },
  { "Tweet Type" : "Service","Name" : "push","Thing ID" : "MySmartThing1","Entity ID" : "laser_emitter","Space ID" : "HeranSmartSpace","Vendor" : "","API" : "turnLaser:[NULL,NULL, NULL]:(int)","Type" : "Action","AppCategory" : "Lighting","Description" : "","Keywords" : "turn on of turn off the laser" },
  { "Tweet Type" : "Service","Name" : "readTiltSwitch","Thing ID" : "MySmartThing1","Entity ID" : "laser_emitter","Space ID" : "HeranSmartSpace","Vendor" : "","API" : "turnLaser:[NULL,NULL, NULL]:(int)","Type" : "Action","AppCategory" : "Lighting","Description" : "","Keywords" : "turn on of turn off the laser" },
  { "Tweet Type" : "Relationship","Name" : "Morning Breakfast","Thing ID" : "MySmartThing1","Entity ID" : "laser_emitter","Space ID" : "HeranSmartSpace","Vendor" : "","Type" : "drive","Category" : "Cooperative","Description" : "","FS name" : "readSth", "SS name" : "turnLED" },
  { "Tweet Type" : "Relationship","Name" : "Coffee Machine","Thing ID" : "MySmartThing1","Entity ID" : "laser_emitter","Space ID" : "HeranSmartSpace","Vendor" : "","Type" : "drive","Category" : "Cooperative","Description" : "","FS name" : "readTiltSwitch", "SS name" : "pushSth" }
];

export {
  dummy_tweets
}
