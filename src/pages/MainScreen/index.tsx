import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { PostContent } from "@/components/PostContent";
import { TextLg } from "@/components/TextLg";
import { addPost } from "@/redux/post";
import { RootState } from "@/store";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";


const MainScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const userName = useSelector((state: RootState) => state.user.name);
  const posts = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch();

  function handleFormTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleFormContent(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value)
  }

  function handleCreatePost() {
    const now = new Date();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const newPost = {
      id: Date.now(),
      name: userName,
      title,
      content,
      minutes: minutes,
      hours: hours
    };
    dispatch(addPost(newPost));
    setTitle('');
    setContent('');
  }

  return(
    <div className="h-screen w-screen flex justify-center text-black left-0 top-0 right-0 overflow-hidden">
      <div className={`w-full sm:w-1/2 bg-white ${posts.length <= 2 ? 'mt-92': ''} `}>
        <div className="bg-[#7695EC] p-7 text-white rounded-t-lg">
          <TextLg text="CodeLeap Network" />    
        </div>

        <div className=" m-7 px-7 py-2 border-2 border-slate-400 rounded-lg">

          <TextLg text="What’s on your mind?" />
          <div className="pb-8">
            <p>Title</p>
            <Form onChange={(event) => handleFormTitle(event)} placeholder="Hello Word" value={title}/>
          </div>

          <div className="pb-8">
            <p>Content</p>
            <Form onChange={(event) => handleFormContent(event)} placeholder="Content Here" value={content}/>
          </div>

          <div className={`flex justify-end items-end ${title.length && content.length > 0 ? '': 'text-slate-500'}`}>
            <Button onClick={handleCreatePost} text="Create" disabled={title.length && content.length > 0 ? false : true }/>
          </div>

        </div>

        <PostContent />

      </div>
    </div>
  );
}

export default MainScreen;