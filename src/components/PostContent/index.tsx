import { useState, ChangeEvent } from "react";
import { TextLg } from "../TextLg";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { deletePostRequest, editPost, editPostRequest } from "@/redux/post"; 
import { Form } from "../Form";


interface PostClicked {
  id: number | undefined,
}

interface EditPost {
  id: number,
  newTitle: string,
  newContent: string
}


export const PostContent = () => {
  const [deletePostModal, setDeletePostModal] = useState<boolean>(false);
  const [editPostModal, setEditPostModal] = useState<boolean>(false);
  const userName = useSelector((state: RootState) => state.user.name);
  const posts = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch();
  const [clickedPost, setClickedPost] = useState<PostClicked>();
  const [idPost, setIdPost] = useState<number>();
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');


  function handleFormNewTitle(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value)
  }

  function handleFormNewContent(event: ChangeEvent<HTMLInputElement>) {
    setNewContent(event.target.value)
  }

  function deletePost(item: PostClicked) {
    setClickedPost(item);
    setIdPost(item.id)
    setDeletePostModal(true);
  }

  function handleDeletePost(id: number){
    dispatch(deletePostRequest(id));
    setDeletePostModal(false)
  }

  function editPost(item: PostClicked) {
    setEditPostModal(true);
    setClickedPost(item);
    setIdPost(item.id)
  }

  function handleEditPost(id: number, newTitle: string, newContent: string) {
    const now = new Date();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const editedPost = {
      id,
      name: userName,
      title: newTitle,
      content: newContent,
      minutes: minutes,
      hours: hours
    };
    setNewTitle('');
    setNewContent('');
    dispatch(editPostRequest(editedPost));
    setEditPostModal(false)
  }

  return(
    <div className="bg-white pb-5">
      {
        posts.map((item) => {
          return(
            <div key={item.id} className=" m-7 border-2 border-slate-400 rounded-lg overflow-hidden">
              <div className="bg-[#7695EC] flex-1 flex justify-between p-7 text-white w-full rounded-t-md">
                <TextLg text={item.title} />
                <div className="flex-1">
                  <MdOutlineDeleteForever size={30} onClick={() => deletePost(item)} 
                    className="hover:text-gray-400 transition-all duration-500" 
                  />
                  <BiEdit size={30} onClick={() => editPost(item)} 
                    className="hover:text-gray-400 transition-all duration-500" 
                  />   
                </div> 
              </div>

              <div>
                <div className="flex justify-between px-7 pt-6">
                  <p className="text-[#777777] font-bold text-lg">@{userName}</p>
                  <p className="text-[#777777] font-bold text-lg">{item.hours}:{item.minutes}</p>
                </div>
                <div className="px-7 py-4">
                  <p className="max-w-full break-words text-black">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      }
      
      <div 
        className={`
          ${deletePostModal ? 'flex': 'hidden'}
          absolute 
          h-screen w-full 
          justify-center 
          items-center
          bg-opacity-25 bg-black 
          left-0 right-0 top-0 bottom-0
        `}
      >
        <div className="bg-white w-screen sm:w-1/3 p-6 text-black rounded-lg">
          <TextLg text="Are you sure you want to delete this item?" />

          <div className="flex justify-end items-end mt-4">
            <button 
              className="mr-4 border rounded-md border-black px-5"
              onClick={() => setDeletePostModal(false)}
            >
              Cancel
            </button>
            <button 
              className="bg-red-600 text-white text-bold rounded-md px-5"
              onClick={() => idPost && handleDeletePost(idPost)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`
          ${editPostModal ? 'flex': 'hidden'}
          ${editPostModal ? 'overflow-hidden': 'hidden'}
          absolute 
          h-screen w-full 
          justify-center 
          items-center 
          bg-opacity-25 bg-black 
          left-0 right-0 top-0 bottom-0
        `}
      >
        <div className="bg-white w-screen sm:w-1/3 p-6 text-black rounded-lg">
          <TextLg text="Edit item" />

          <div>
            <p>Title</p>
            <Form onChange={(event) => handleFormNewTitle(event)} value={newTitle} />

            <p className="mt-3">Content</p>
            <Form onChange={(event) => handleFormNewContent(event)} value={newContent} />
          </div>

          <div className="flex justify-end items-end mt-4">
            <button 
              className="mr-4 border rounded-md text-bold border-black px-5"
              onClick={() => setEditPostModal(false)}
            >
              Cancel
            </button>
            <button 
              className="bg-green-500 text-white text-bold rounded-md px-5"
              onClick={() => idPost && handleEditPost(idPost, newTitle, newContent)}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}