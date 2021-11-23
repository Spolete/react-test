import React, { useState, useRef, useMemo, useEffect } from 'react';
import Counter from '../components/counter';
import ClassCounter from '../components/ClassCounter';
import '../styles/App.css';
import PostItem from '../components/PostItem';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import PostForm from '../components/PostForm';
import MySelect from '../components/UI/select/MySelect';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../components/hooks/usePosts';
import axios from 'axios';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../components/hooks/useFetchig';
import { getPageCount, getPagesArray } from '../utils/pages';
import { usePagination } from '../components/hooks/usePagination';
import Pagination from '../components/UI/pagination/pagination';

function Posts() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Ляляля', body: 'dsfsdf' },
    { id: 2, title: 'Ляляля', body: 'dsfsdf' },
    { id: 3, title: 'Ляляля', body: 'dsfsdf' },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Получаем пост из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {isPostLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Разработки"
        />
      )}
      <Pagination totalPages={totalPages} changePage={changePage} page={page} />
    </div>
  );
}

export default Posts;
