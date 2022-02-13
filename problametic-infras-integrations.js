var jsonData = {}; //this is the json data from DDOGs infrastructure list page.

var integrationIssueHosts = []; //holder for erroneous/warning level integration checks

//loop through the hosts and then loop through the meta.agent_checks and look for WARNING and ERRORs.
jsonData.rows.forEach(function (row) {
	for (const appsRow in row.meta.agent_checks) {
	    var agent_checks = row.meta.agent_checks;
	    agent_checks.forEach(function(agentCheckRow) {
	        if (agentCheckRow.includes("WARNING") || (agentCheckRow.includes("ERROR"))) {
    			//Found a trouble integration. Append it to the integrationIssueHosts array
    			var errorObj = {
    				host: row.display_name,
    				integration: agentCheckRow
    			}
    			integrationIssueHosts.push(errorObj);
    			delete errorObj;
    		}
	    })
	}
})

console.log(integrationIssueHosts);
