import express from "express";
var app = express()
import client from "..";


// this api route should never be exposed to the public
//TODO: authorization middleware
app.get('/stats', function(req : express.Request, res : express.Response) : any {
	if (req.headers.authorization !== process.env.STATISTICS_TOKEN || !req.headers.authorization) return res.status(401).json({
		error: "Unauthorized",
		client: null
	});
   return res.json({
		client
   }).status(200);
})

export default app;
