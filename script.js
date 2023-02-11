var SuperTabs = function(tabContainerID){
	var mainObject = this;

	this.container;

	if(tabContainerID != undefined)this.container = document.querySelector("#"+tabContainerID);

	this.tabs = [];

	this.tabClass = "classHere";
	this.tabTitleClass = "classHere";
	this.tabRemoveClass = "classHere";

	this.onOpen;
	this.onClose;
	this.onMove;

	this.on = function(type,execute){
		if(type == "open"){
			mainObject.onOpen = execute;
		}else if(type == "close"){
			mainObject.onClose = execute;
		}else if(type == "move"){
			mainObject.onMove = execute;
		}
	}

	this.update = function(){
		mainObject.container.innerHTML = "";
	    for(let index in mainObject.tabs){
	        var tab = document.createElement("div");
	        tab.style.display = "inline-block";
	        tab.className = mainObject.tabClass;
	        mainObject.container.appendChild(tab);

	        var tabTitle = document.createElement("button");
	        tabTitle.innerText = mainObject.tabs[index].title;
	        tabTitle.className = mainObject.tabTitleClass;
	        tabTitle.onclick = function(){
	            if(mainObject.onOpen != undefined)mainObject.onOpen(index);
	        };
	        tab.appendChild(tabTitle);

	        var tabClose = document.createElement("button");
	        tabClose.innerText = "X"
	        tabClose.className = mainObject.tabRemoveClass;
	        tabClose.onclick = function(){
	            mainObject.tabs.splice(index,1);
	            mainObject.update();
	            if(mainObject.onClose != undefined)mainObject.onClose(index);
	        };
	        tab.appendChild(tabClose);

	        mainObject.moveTab(tabTitle,index);
	    }
	}

	this.moveTab = function(element,index){
	    var tabX;
	    var leftElement;
	    var rightElement;
	    var newIndex = index;

	    element.addEventListener("mousedown",function(event){
	        tabX = event.pageX - element.parentNode.offsetLeft;
	        leftElement = element.parentNode.previousElementSibling;
	        rightElement = element.parentNode.nextElementSibling;
	        if(rightElement != undefined)rightElement.style.marginLeft = element.parentNode.offsetWidth+"px";
	        element.parentNode.style.position = "absolute";
	        element.parentNode.style.zIndex = "3";
	        addEventListener("mousemove",dragMove);
	        addEventListener("mouseup",dragEnd);
	    });
	    function dragMove(event){
	        if((event.pageX - tabX) >= 0){
	            element.parentNode.style.left = (event.pageX - tabX)+"px";
	        }
	        if(leftElement != undefined){
	            if(element.parentNode.offsetLeft <= (leftElement.offsetLeft + (element.parentNode.offsetWidth / 2))){
	                if(rightElement != undefined){
	                    rightElement.style.marginLeft = "0px";
	                    rightElement = leftElement;
	                    leftElement = 
	                        leftElement.previousElementSibling == element.parentNode ?
	                            leftElement.previousElementSibling.previousElementSibling : leftElement.previousElementSibling;
	                    rightElement.style.marginLeft = element.parentNode.offsetWidth+"px";
	                }else{
	                    rightElement = leftElement;
	                    leftElement = 
	                        leftElement.previousElementSibling == element.parentNode ?
	                            leftElement.previousElementSibling.previousElementSibling : leftElement.previousElementSibling;
	                    rightElement.style.marginLeft = element.parentNode.offsetWidth+"px";
	                }
	                newIndex--;
	                if(mainObject.onMove != undefined)mainObject.onMove(index,"left");
	            }
	        }
	        if(rightElement != undefined){
	            if(element.parentNode.offsetLeft >= (rightElement.offsetLeft - (element.parentNode.offsetWidth / 2))){
	                rightElement.style.marginLeft = "0px";
	                leftElement = rightElement;
	                rightElement = rightElement.nextElementSibling == element.parentNode ? rightElement.nextElementSibling.nextElementSibling : rightElement.nextElementSibling;
	                if(rightElement != undefined)rightElement.style.marginLeft = element.parentNode.offsetWidth+"px";
	                newIndex++;
	                if(mainObject.onMove != undefined)mainObject.onMove(index,"right");
	            }
	        }
	    }
	    function dragEnd(){
	        element.parentNode.style.marginLeft = "0px";
	        if(rightElement != undefined)rightElement.style.marginLeft = "0px";
	        element.parentNode.style.position = "relative";
	        element.parentNode.style.zIndex = "2";
	        element.parentNode.style.left = "0px";
	        var tab = mainObject.tabs[index];
	        mainObject.tabs.splice(index,1);
	        mainObject.tabs.splice(newIndex,0,tab);
	        mainObject.update();
	        removeEventListener("mousemove",dragMove);
	        removeEventListener("mouseup",dragEnd);
	    }
	}
}