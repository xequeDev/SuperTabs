# SuperTabs
A library for build tabs easily

## Creating a simple container
```
<div id="tabs" style="width:100%;height:50px;position:absolute;left:0px;top:0px;background:#121215;"></div>
```

## Get library and container
```
var myTabs = new SuperTabs("tabs");
```

## Adding tabs
```
myTabs.tabs.push({title:"My tab!"});
//The title property is required and you can add custom propertys
```

## Events in tabs
```
myTabs.on("open",function(index){
  //Do anything
});
//open, close and move are the events
```

## Stylize tabs
```
myTabs.tabClass = "classHere";
myTabs.tabTitleClass = "classHere";
myTabs.tabRemoveClass = "classHere";
```

## Update the tabs container
```
myTabs.update();
```
