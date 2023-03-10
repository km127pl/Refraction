import express from "express";
const app = express();
import client from "..";


// this api route should never be exposed to the public
//TODO: authorization middleware
app.get("/stats", function(req : express.Request, res : express.Response) : unknown {
	if (req.query.authorization !== process.env.STATISTICS_TOKEN || !req.query.authorization) return res.status(401).json({
		error: "Unauthorized",
		client: null
	});
	return res.json({
		client
	}).status(200);
});

export default app;
