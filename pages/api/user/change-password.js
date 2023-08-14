import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]";
import { connectToDatabase } from "../../../utils/db";
import { hashPassword, verifyPassword } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  console.log(session);

  if (!session) {
    res.status(401).json({ message: "You must be logged in. " });
    return;
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const arePasswordsEqual = verifyPassword(oldPassword, currentPassword);

  if (!arePasswordsEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();

  return res.status(200).json({
    message: "Successfully changed the password",
  });
}
