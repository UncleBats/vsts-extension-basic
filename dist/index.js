define(["require", "exports", "TFS/Build/RestClient", "TFS/WorkItemTracking/RestClient", "ReleaseManagement/Core/RestClient", "VSS/Controls", "VSS/Controls/Grids"], function (require, exports, BuildRestClient, WorkitemRestClient, RestClient, Controls, Grids) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getTeamContext() {
        var webcontext = VSS.getWebContext();
        return {
            projectname: webcontext.project.name,
            teamId: webcontext.team.id
        };
    }
    exports.getTeamContext = getTeamContext;
    function show(divName, func) {
        var elt = document.getElementById(divName);
        var result = func(elt);
    }
    exports.show = show;
    function getAvailableBuildDefinitions(target) {
        // Get an instance of the client
        var client = BuildRestClient.getClient();
        client.getDefinitions(getTeamContext().projectname).then(function (definitions) {
            target.innerText = JSON.stringify(definitions);
        });
    }
    exports.getAvailableBuildDefinitions = getAvailableBuildDefinitions;
    show("builds", getAvailableBuildDefinitions);
    function geWorkitems(target) {
        // Get an instance of the client
        var client = WorkitemRestClient.getClient();
        client.getWorkItems([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 272]).then(function (definitions) {
            target.innerText = JSON.stringify(definitions);
        });
    }
    exports.geWorkitems = geWorkitems;
    show("workitems", geWorkitems);
    //little holder class for my grid datasource
    var releaseGrid = /** @class */ (function () {
        function releaseGrid() {
        }
        return releaseGrid;
    }());
    function getAvailableReleaseDefinitions(source, target) {
        // Get an instance of the client
        var client = RestClient.getClient();
        client.getReleaseDefinitions(getTeamContext().projectname).then(function (definitions) {
            definitions.forEach(function (d) {
                source.push({ name: d.name, id: d.id });
            });
            //data is retrieved via a IPromise so update the datasource when you have gotten it
            target.setDataSource(source);
        });
    }
    exports.getAvailableReleaseDefinitions = getAvailableReleaseDefinitions;
    //get the div to show your grid
    var container = $("#grid-container");
    var source = new Array();
    //define your grid
    var gridOptions = {
        height: "300px",
        width: "500px",
        source: source,
        columns: [
            { text: "ReleaseName", width: 200, index: "name" },
            { text: "ReleaseIdentifier", width: 200, index: "id" }
        ]
    };
    var grid = Controls.create(Grids.Grid, container, gridOptions);
    getAvailableReleaseDefinitions(source, grid);
});
