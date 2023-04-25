import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../../actions/userReducer";
import { TextLg } from "@/components/TextLg";


const Signup = () => {

  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();

  function user() {
    dispatch(setName(userName));
    localStorage.setItem('userName', userName);
    router.push("/MainScreen");
  }

  function handleFormSignUp(event: ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value)
    return 'aa'
  }

  return(
    <div className="h-screen w-screen sm:w-1/3 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-xl w-[500px]">
        <div>
          <TextLg text="Welcome to CodeLeap network!" />
          
          <p className="pt-6">
            Please enter your username
          </p>

          <Form onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormSignUp(event)} placeholder="John Doe" value={userName} />   
        </div>

        <div className={`flex justify-end items-end pt-5 ${userName.length <= 0 ? 'text-slate-500': ''}`}>
          <Button onClick={user} text="Enter" disabled={userName.length <= 0} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
