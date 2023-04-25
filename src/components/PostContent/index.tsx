import { useState, ChangeEvent } from "react";
import { TextLg } from "../TextLg";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { deletePostRequest, editPost, editPostRequest } from "@/actions/post"; 
import { Form } from "../Form";


interface PostClicked {
  id?: number | undefined,
}

interface EditPost {
  id?: number,
  newTitle: string,
  newContent: string
}


export const PostContent = () => {
  const [deletePostModal, setDeletePostModal] = useState<boolean>(false);
  const [editPostModal, setEditPostModal] = useState<boolean>(false);
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
    const storedUserName = localStorage.getItem('userName'); // recupera o valor armazenado do localStorage
    console.log(storedUserName)

    const editedPost = {
      created_datetime: new Date().toISOString(),
      id,
      title: newTitle,
      content: newContent,
    };
    setNewTitle('');
    setNewContent('');
    dispatch(editPostRequest(editedPost));
    setEditPostModal(false)
  }

  function postedInMinutes(date: string) {
    const createdDate = new Date(date);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - createdDate.getTime();
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    return diffMinutes.toString()
  }

  return(
    <div className="bg-white pb-5 ">
      {
        posts.map((item) => {
        
          return(
            <div key={item.id} className=" m-7 border-2 border-slate-400 rounded-lg ">
              <div className="bg-[#7695EC] flex-1 flex justify-between p-7 text-white w-full rounded-t-md">
                <TextLg text={item.title} />
                <div className="flex">
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
                  <p className="text-[#777777] font-bold text-lg">@{item.username}</p>
                  <p className="text-[#777777] font-bold text-lg">{postedInMinutes(item.created_datetime)} minutes</p>
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
          fixed
          overflow-hidden 
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
          fixed
           
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