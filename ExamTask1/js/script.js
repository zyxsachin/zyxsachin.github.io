

/*
var x = document.getElementById("geoloc");
var y = document.getElementById("dist");

var wd = document.getElementById("wdist");
var bd = document.getElementById("bdist");
var id = document.getElementById("idist");
var sd = document.getElementById("sdist");
var jd = document.getElementById("jdist");
*/

var lat;
var lon;

var wdistance;
var bdistance;
var idistance;
var sdistance;
var jdistance;

var wlat = -24.003813 * Math.PI / 180;
var wlon = 31.523483 * Math.PI / 180;

var blat = -1.522039 * Math.PI / 180;
var blon = 35.337010 * Math.PI / 180;

var ilat = 26.604285 * Math.PI / 180;
var ilon = 93.388778 * Math.PI / 180;

var slat = -4.919436 * Math.PI / 180;
var slon = 105.753611 * Math.PI / 180;

var jlat = -6.784571 * Math.PI / 180;
var jlon = 105.380081 * Math.PI / 180;

var r = 6371;


function changeColor(linkId) {
				
	// Then show the section with the ID the user selected from the menu.
	if (linkID == a) {
		document.getElementById("a").style.color="red";
	} else if (linkID == b) {
		document.getElementById("species").style.display='block';
	} else if (linkID == c) {
		document.getElementById("location").style.display='block';
	} else if (linkID == d) {
		document.getElementById("poaching").style.display='block';
	} else if (linkID == e) {
		document.getElementById("images").style.display='block';
	}
	
}

function selectSection(linkID) {
	// First, hide all sections.
	document.getElementById("about").style.display='none';
	document.getElementById("species").style.display='none';
	document.getElementById("location").style.display='none';
	document.getElementById("poaching").style.display='none';
	document.getElementById("images").style.display='none';
				
	// Then show the section with the ID the user selected from the menu.
	if (linkID == 0) {
		document.getElementById("about").style.display='block';
	} else if (linkID == 1) {
		document.getElementById("species").style.display='block';
	} else if (linkID == 2) {
		document.getElementById("location").style.display='block';
	} else if (linkID == 3) {
		document.getElementById("poaching").style.display='block';
	} else if (linkID == 4) {
		document.getElementById("images").style.display='block';
	}
}

function selectLocation(linkID) {
	// First, hide all sections.
	document.getElementById("whiteLocation").style.display='none';
	document.getElementById("blackLocation").style.display='none';
	document.getElementById("indiaLocation").style.display='none';
	document.getElementById("sumatraLocation").style.display='none';
	document.getElementById("javaLocation").style.display='none';
				
	// Then show the section with the ID the user selected from the menu.
	if (linkID == 0) {
		document.getElementById("whiteLocation").style.display='block';
	} else if (linkID == 1) {
		document.getElementById("blackLocation").style.display='block';
	} else if (linkID == 2) {
		document.getElementById("indiaLocation").style.display='block';
	} else if (linkID == 3) {
		document.getElementById("sumatraLocation").style.display='block';
	} else if (linkID == 4) {
		document.getElementById("javaLocation").style.display='block';
	}
}



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
	lat = position.coords.latitude * Math.PI / 180 /** 111000*/;
	lon = position.coords.longitude * Math.PI / 180 /** 111000*/;
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
function distance(lat1,lon1,lat2,lon2) {
	var dlat = (lat2 - lat1)/2;
	var dlon = (lon2 - lon1)/2;
	
	var temp = Math.pow(Math.sin(dlat), 2) + Math.cos(lat1) * 
		Math.cos(lat2) * Math.pow(Math.sin(dlon), 2);

	return 2 * r * Math.asin(Math.sqrt(temp));
}

function calcDistance() {

	wdistance = distance(lat,wlat,lon,wlon);
	bdistance = distance(lat,blat,lon,blon);
	idistance = distance(lat,ilat,lon,ilon);
	sdistance = distance(lat,slat,lon,slon);
	jdistance = distance(lat,jlat,lon,jlon);

	/*
	y.innerHTML = "Distances: " + wdistance + " " + bdistance + " " + idistance + " " + sdistance + " " + jdistance + " " ;
	*/
	
	wd.innerHTML = wdistance.toFixed(2);
	bd.innerHTML = bdistance.toFixed(2);
	id.innerHTML = idistance.toFixed(2);
	sd.innerHTML = sdistance.toFixed(2);
	jd.innerHTML = jdistance.toFixed(2);

}

// Check if user is on a mobile device and handle appropriately.
function selectFittingCSS() {
	// Prepare to dynamically load CSS.
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
				
	// Sniff the user agent and match it with a regex. It's better to use libraries like "wurfl.io"
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		// Check for preferences-cookie.
		var preference = getCookie("use_mobile");
		if (preference == "") {
			// User is on mobile device and preferece cookie is not set. Ask if they want to use the mobile version.
			var useMobile = confirm("Hey there! You are using a mobile device. Do you want to be redirected to the mobile version of this website?");
			if (useMobile == true) {
				// User is on a mobile device and wants to use the mobile version.
				fileref.setAttribute("href", "css/style_mobile.css");
				// Remember choice.
				document.cookie="use_mobile=yes";
			} else {
				// User is on a mobile device but wants to use the regular version.
				fileref.setAttribute("href", "css/style.css");
				// Remember choice.
				document.cookie="use_mobile=no";
			}
		} else if (preference == "yes") {
			// Preference cookie set to "yes". Use mobile version.
			fileref.setAttribute("href", "css/style_mobile.css");
		} else {
			// Preference cookie set to "no". Use regular version.
			fileref.setAttribute("href", "css/style.css");					
		}
	} else {
		// User is not on a mobile device. Choose normal stylesheet.
		fileref.setAttribute("href", "css/style.css");
				
		// Don't show preferences button.
		document.getElementById("preferenceButton").style.display='none';
	}
			
	// Load CSS.
	document.getElementsByTagName("head")[0].appendChild(fileref);
}