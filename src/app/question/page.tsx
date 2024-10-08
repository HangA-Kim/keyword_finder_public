import QuestionInput from "./QuestionInput";
import { getServerAuthSession } from "~/server/auth";

export default async function Question() {
  const session = await getServerAuthSession();
  return <QuestionInput session={session} />;
}
