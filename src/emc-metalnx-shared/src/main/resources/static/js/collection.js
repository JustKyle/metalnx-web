function getCollectionSummary(path){	
	var url = "/emc-metalnx-web/collectionInfo"+path;
	getBreadcrumb(path);
	console.log("URL :: " +url);
	ajaxEncapsulation(url, "GET", {path: path}, displayCollectionSummary, null, null);
}

function displayCollectionSummary(data){
	console.log("displayTestDetails()");	
	$("#summary").html(data);	
	//displayInfoDetails(data);	
}


function getInfoDetails(path){
	//$("#info").hide();
	//$("#table-loader").show();	
	window.location.hash = "info";	
	var url = "/emc-metalnx-web/collectionInfo/collectionFileInfo/";
	ajaxEncapsulation(url, "POST", {path: path}, displayInfoDetails, null, null, null);
	
}

function getMetadata(path){
	$("#metadata").hide();
	$("#table-loader").show();		
	console.log("Collection getMetadata() :: " +path);
	window.location.hash = "metadata";
	var url = "/emc-metalnx-web/metadata/getMetadata/";	
	ajaxEncapsulation(url , "POST", {path: path}, displayMetadata, null, null, null);
}

function getPermissionDetails(path){
	$("#permission").hide();
	$("#table-loader").show();		
	console.log("Collection getPermDetails() :: " +path);
	window.location.hash = "permission";
	var url = "/emc-metalnx-web/permissions/getPermissionDetails/";	
	ajaxEncapsulation(url, "POST", {path: path}, displayPermissionDetails, null, null);
}

function getPerview(path){
	console.log("Collection getPreview() :: " + path)
	window.location.hash = "preview";
	var url = "/emc-metalnx-web/preview/prepareForPreview/";
	ajaxEncapsulation(url, "GET", {path:path}, displayPreviewImage, null, null);	
}

function displayPreviewImage(data){
	//$("#previewFile").attr("src","data:image/png;base64," + data);	
	$("#preview").html(data);
	
}

function displayInfoDetails(data){
	//$("#table-loader").hide();
	$("#info").html(data);
	//$("#info").show();
}

function displayMetadata(data){
	console.log("display Metadata :: " +data);
	$('#table-loader').hide();
	$('#table-loader').after(data);
	/*$("#uploadIcon").prop("disabled", true);
    $("#uploadIcon").addClass("disabled");
    $("#showCollectionFormBtn").prop("disabled", true);
    $("#showCollectionFormBtn").addClass("disabled");*/
	$("#metadata").html(data);	
	//$("#metadata").show();
}

function displayPermissionDetails(data){
	console.log("display Permission");
	//$("#table-loader").hide();
	 $('#table-loader').hide();
     $("#table-loader").after(data);
     /*$("#uploadIcon").prop("disabled", true);
     $("#uploadIcon").addClass("disabled");
     $("#showCollectionFormBtn").prop("disabled", true);
     $("#showCollectionFormBtn").addClass("disabled");*/
	$('#permission').html(data);
	//$("#permission").show();    
}
function getTestSubDirectories(){
	alert("get directories");
}
function showPreview(){
	alert("Show Preview");
	
	$.ajax({
		type : "POST",
		url : "/emc-metalnx-web/collectionInfo/getFile/",
		timeout : 100000,
		success : function(data) {
			console.log("SUCCESS: ", data);
			console.log(data);
		},
		error : function(e) {
			console.log("ERROR: ", e);
			console.log(e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
}

function starPath(path){
	console.log("StarPath() starts");
	//$('#breadcrumbStar').attr('onclick', '');
	var url = "/emc-metalnx-web/favorites/addFavoriteToUser/";		
	ajaxEncapsulation(url, "GET", {path: path}, 
		function(data){
			if(data.indexOf("OK") >= 0){
				$('#breadcrumbStar i').removeClass('bm-unchecked').addClass('bm-checked');
				$('#breadcrumbStar').attr('onclick', 'unstarPath("'+path+'")');
				//$('#breadcrumbStar').tooltip('hide').attr('data-original-title',[[#{collections.favorite.unmark.button.tooltip}]]);
			}else{
				$('#breadcrumbStar').attr('data-content', 'Could not add path to favorites.')
				$('#breadcrumbStar').popover("show");
				$('#breadcrumbStar').attr('onclick', 'starPath("'+path+'")');
			}
		
	}, null, null, null);
	console.log("StarPath() ends");
}

function unstarPath(path){
	console.log("UnstarPath() starts !!");
	//$('#breadcrumbStar').attr('onclick', '');
	var url = "/emc-metalnx-web/favorites/removeFavoriteFromUser/";		
	ajaxEncapsulation(url, "GET", {path: path},
		function(data){
			if(data.indexOf("OK") >= 0){
				$('#breadcrumbStar i').removeClass('bm-checked').addClass('bm-unchecked');
				$('#breadcrumbStar').attr('onclick', 'starPath("'+path+'")');
				//$('#breadcrumbStar').tooltip('hide').attr('data-original-title',[[#{collections.favorite.button.tooltip}]]);
			}else{
				$('#breadcrumbStar').attr('data-content', 'Could not remove path from favorites.')
				$('#breadcrumbStar').popover("show");
				$('#breadcrumbStar').attr('onclick', 'unstarPath("'+path+'")');
			}
		}, null, null, null);
	console.log("UnstarPath() ends");
}

function positionBrowserToPath(path) {
	alert("positionBrowserToPath :: " +path);
	window.location.href = '/emc-metalnx-web/collections' + path; //relative to domain
}

function fileDownload(path){
	console.log("File Download");
	
	var prepareDownloadURL = "/emc-metalnx-web/fileOperation/prepareFilesForDownload/";
	var paths = [];
	paths.push(path);
	ajaxEncapsulation(prepareDownloadURL, "GET", {paths: paths}, handleDownload, null);
	//$("#actions button").prop("disabled", true);
}

function deleteInfoAction(path){
	console.log("Ready for deletion");
	$("#actionmenu button").prop("disabled", true);
	$('#actionsWait').show();
	
	var paths = [];
	paths.push(path);
	var url = "/emc-metalnx-web/fileOperation/delete/";

	ajaxEncapsulation(
		url,
		"POST",
		{paths: paths},
		function (data) {
			$("#tree-view-panel-body").html(data);

		}
	);
	window.location.href = "/emc-metalnx-web/browse/home";
}

function editInfo(path){

}

function handleDownload() {	
	window.location.href = "/emc-metalnx-web/fileOperation/download/";
}

/*function handleDownloadFailure() {
	console.log(handleDownloadFailure);
}
*/
/*

function ChangeUrl(title, urlVal) {
	console.log("ChangeUrl()");
	var str1 = "emc-metalnx-web/collections";	
	var url = str1.concat(urlVal);	
	console.log("url :: " +url);	

    if (typeof (history.pushState) != "undefined") {
        var obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    } else {
        alert("Browser does not support HTML5.");
    }
}*/

