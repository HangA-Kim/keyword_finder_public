import { PARAM_ALEADY_USER, PARAM_NOT_SAVED_USER } from "~/common/constant";
import LoginFirst from "./LoginFirst";
import SignUpFirst from "./SignUpFirst";

export default async function ErrAuth({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const intent = searchParams["intent"];
  const email = searchParams["email"] || "";
  console.log("intent:", intent);
  return (
    <>
      {intent === PARAM_ALEADY_USER && <LoginFirst email={email} />}
      {intent === PARAM_NOT_SAVED_USER && <SignUpFirst />}
    </>
  );
}
