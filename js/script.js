//Search Function
var token = "?access_token=7f3238738f78bc7f0dd5b63cf8619a4692d6cc3f"

var inputEl = document.querySelector('#search')
inputEl.value = "Search GitHub"

var searchBaseUrl = "https://api.github.com/users/"

var inputToUrl = function(keyEvent) {
    var inputEl = keyEvent.target
    if (keyEvent.keyCode === 13) {
        var userName = inputEl.value
        inputEl.value = ""
        location.hash = userName
    }
}

inputEl.addEventListener("keydown", inputToUrl)

var controller = function() {
    var userName = location.hash.substring(1)
    doSearchRequest(userName)
}

window.addEventListener("hashchange", controller)


var doSearchRequest = function(userName) {
	var profileUrl = searchBaseUrl + userName + token
	var userNamePromise = $.getJSON(profileUrl)  
	userNamePromise.then(showObj)
	var reposUrl = searchBaseUrl + userName + "/repos" + token
	var userReposPromise = $.getJSON(reposUrl)  
	userReposPromise.then(showData)
}


//Left Column 

var leftCol = document.querySelector("#left")

var profileBaseUrl = "https://api.github.com/users/RedStarThrower"

var profileUrl = profileBaseUrl + token

var profilePromise = $.getJSON(profileUrl)


var showObj = function(jsonObj) {
	//console.log(jsonObj)
	var totalProfileString = ""
	totalProfileString += objToHTML(jsonObj)
	leftCol.innerHTML = totalProfileString
}

var objToHTML = function(jsonObj) {
    var profileString = ""
    profileString += '<img class="avatar" src="' + jsonObj.avatar_url + '">'
    profileString += '<div class="namesBox">' + '<div class="full-name">' + jsonObj.name + '</div>'
    profileString += '<div class="username">' + jsonObj.login + '</div>' + '<hr class="left-line">' + '</div>' 
    profileString += '<ul class="details">' + '<li>' + jsonObj.location + '</li>'
    profileString += '<li>' + '<a href="mailto:' + jsonObj.email + '" target="_blank">' + jsonObj.email + '</a>' + '</li>'
    profileString += '<li>' + '<a href="' + jsonObj.blog + '" target="_blank">' + jsonObj.blog + '</a>' + '</li>'
    profileString += '<li>' + '<time class="join-date" datetime="' + jsonObj.created_at + 'day="numeric" is="local-time" month="short" year="numeric" title="Feb 6, 2014, 11:21 PM CST">Joined on Feb 6, 2014</time>' + '</ul>' + '<hr class="left-line">'
    return profileString
}

profilePromise.then(showObj)

// Right Column

var rightCol = document.querySelector("#right")

var reposBaseUrl = "https://api.github.com/users/RedStarThrower/repos"

var reposUrl = reposBaseUrl + token

var reposPromise = $.getJSON(reposUrl)

var showData = function(jsonArray) {
    //console.log(jsonArray)
    var htmlString = ""
    for (var i = 0; i < jsonArray.length; i++) {
        var repoObj = jsonArray[i]
        htmlString += arrToHTML(repoObj)
    }
    rightCol.innerHTML = htmlString
}


var arrToHTML = function(repoObj) {
	var repoString = '<p id="repos-title">Repositories</p>' + '<div class="repo-container">'
		repoString += '<h3 class="repo-name">' + '<a href="' + repoObj.html_url + '" target="_blank">' + repoObj.name + '</a>' + '</h3>'
		repoString += '<p class="repo-description">' + repoObj.description + '</p>'	
		repoString += '<p class="repo-list-meta">Updated: <time datetime="'+ repoObj.updated_at +  'is="relative-time" title="Feb 26, 2016, 10:37 PM CST">4 days ago</time>' + '</p>' + '<hr id="repo-line">'
	+ '</div' 
 	return repoString
}

reposPromise.then(showData)

//

if (location.hash !=='') {
    controller()
}

else {
    profilePromise.then(showObj)
    reposPromise.then(showData)
}

