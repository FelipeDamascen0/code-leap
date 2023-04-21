import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../../redux/userReducer";
import { TextLg } from "@/components/TextLg";


export const Signup = () => {

  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();

  function test() {
    dispatch(setName(userName));
    router.push("/MainScreen");
  }

  function handleFormSignUp(event: ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value)
    return 'aa'
  }

  return(
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-xl w-[500px]">
        <div>
          <TextLg text="Welcome to CodeLeap network!" />
          
          <p className="pt-6">
            Please enter your username
          </p>

          <Form onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormSignUp(event)} placeholder="John Doe" value={userName} />   
        </div>

        <div className={`flex justify-end items-end pt-5 ${userName.length <= 0 ? 'text-slate-500': ''}`}>
          <Button onClick={test} text="Enter" disabled={userName.length <= 0} />
        </div>
      </div>
    </div>
  );
}

