function getData(tabId, tab, method)
{
	var data = tab.url + " " + method;
	var pos = data.search("alef");
	var getText = Array();
	if (pos >= 0)
	{
		chrome.tabs.executeScript(tabId, {"code": "document.getElementById(\"logout\").innerText.split('|')"}, function (result) {
		for (i = 0; i < result[0].length; i++)
			getText [i] = result[0][i];
		});
		if (getText[0] != null)
			data = data + " " + getText[0];
	}
	return data;
}

function sendData(data)
{
	$.ajax({
		type: "POST",
		url: "https://localhost/processData",
		data: { data: data }
	})
	.done(function( msg ) {
	alert( "Data Send: " + msg );
	});
}

// Called when the tab is updated.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var data = getData(tabId, tab, "updated");
	sendData(data);
});

// Called when the new tab is created.
chrome.tabs.onCreated.addListener(function(tab) {     
	var data = tab.url + " created";
	sendData(data);
});

// Called when the tab is activated.
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.getSelected(null,function(tab) {
		var tabId = activeInfo.tabId;
		var data = getData(tabId, tab, "activated");
		sendData(data);
	});
});

//chrome.tabs.onclose.addListener(function(tab) {
//	var consoleOutput = tab.url + url + " closed";
//	console.log(consoleOutput);
//});

// Called when the tab is closed.
//chrome.tabs.onclose.addListener(function(tabId, changeInfo, tab) {         
//   console.log(tabId.toString() + ' ' + tab.url + ' closed');
//});

