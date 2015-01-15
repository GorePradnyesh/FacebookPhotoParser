http 				= require('http')
url					= require('url')

var portNumber 		= Number(process.argv[2])


function handleRequest(request, response){
    var urlObject = url.parse(request.url, true)
    console.log(urlObject)
    response.write(urlObject.query.code);
    reponse.statusCode = 200;
    response.end()
}

server = http.createServer(handleRequest)
server.listen(portNumber)