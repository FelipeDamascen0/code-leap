import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { PostContent } from "@/components/PostContent";
import { TextLg } from "@/components/TextLg";
import { Post, addPost, setPosts } from "@/actions/post";
import { RootState } from "@/redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';


const MainScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const posts = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch();

  function handleFormTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleFormContent(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value)
  }

  function handleCreatePost() {
    const storedUserName = localStorage.getItem('userName'); // recupera o valor armazenado do localStorage

    const newPost = {
      username: storedUserName,
      title,
      content,
      created_datetime: new Date().toISOString(),
    };
    axios.post('https://dev.codeleap.co.uk/careers/', newPost)
    .then(response => {
      dispatch(addPost(response.data));
    })
    .catch(error => {
      console.error('Erro ao criar post:', error);
    });
    window.location.reload();
    setTitle('');
    setContent('');
  }


  useEffect(() => {
    axios.get('https://dev.codeleap.co.uk/careers/')
    .then(({data}) => {
      data.results.forEach((post: Post) => {
        dispatch(setPosts(data.results));
      });
    })
    .catch((error) => console.log(error))
    
  }, [dispatch])

  const [limit, setLimit] = useState(10);
  const [offset, setOffSet] = useState(20);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setOffSet(offset + limit)
        console.log(offset)
        axios.get(`https://dev.codeleap.co.uk/careers/?limit=${limit}&offset=${offset}`)
        .then(({data}) => {
          data.results.forEach((post: Post) => {
            dispatch(setPosts(data.results));
          });
        })
        .catch((error) => console.log(error))
        window.scrollTo(0, 0);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, limit, offset]);

  return(
    <div className="h-screen w-screen flex justify-center text-black left-0 top-0 right-0 ">
      <div className={`w-full sm:w-1/2 bg-white ${posts.length <= 2 ? 'mt-92': ''} `}>
        <div className="bg-[#7695EC] p-7 text-white">
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