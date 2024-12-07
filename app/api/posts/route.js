import connectMongo from "../../../utils/connectMongo";
import postModel from "../../../models/postModel";

export async function GET(req) {
  const query = req.nextUrl.searchParams.get("q");

  try {
    await connectMongo();
    let postData;
    if (query) {
      postData = await postModel.find({
        $or: [
          { title: new RegExp(query, "i") },
          { description: new RegExp(query, "i") },
        ],
      });
    } else {
      postData = await postModel.find({});
    }
    return Response.json(postData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
