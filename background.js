function getData(tabId, tab, method)
{
	var data = "Data=" + tab.url + " " + method;
	var pos = data.search("alef");
	if (pos >= 0)
	{
		chrome.tabs.executeScript(tabId, {"code": "document.getElementById('ajaxtabtracker_alefuser').innerText"}, function (result) {
		if (result != null)
			data ="Data=" + data + " " + result;
		});
		
		chrome.tabs.executeScript(tabId, {"code": "document.getElementById('ajaxtabtracker_alefrole').innerText"}, function (result) {
		if (result != null)
			data ="Data=" + data + " " + result;
		});
	}
	return data;
}

function sendDataTab(data)
{
	$.ajax({
		type: "POST",
		url: "http://localhost:8799/processTabData",
		data: { data: data }
	})
	.done(function( msg ) {
	alert( "Data Send: " + msg );
	});
}

// Called when the tab is updated.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var data = getData(tabId, tab, "updated");
	sendDataTab(data);
});

// Called when the new tab is created.
chrome.tabs.onCreated.addListener(function(tab) {     
	var data = tab.url + " created";
	sendDataTab(data);
});

// Called when the tab is activated.
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.getSelected(null,function(tab) {
		var tabId = activeInfo.tabId;
		var data = getData(tabId, tab, "activated");
		sendDataTab(data);
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

