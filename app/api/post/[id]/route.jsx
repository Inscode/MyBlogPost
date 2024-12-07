import connectMongo from "../../../../utils/connectMongo";
import postModel from "../../../../models/postModel";

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const postData = await postModel.findOne({ _id: params.id });
    return Response.json(postData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
