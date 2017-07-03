
function tempFunctions() = 
{
var str = new Date().getTime();
var res = str.substring(7,12);
var id = parseInt(res);

return id;
}

module.exports = tempFunctions();