import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home, Login } from './pages';
import { CreatePost, Header, PostDetail, PostList, UsersList } from './components';
import './App.css';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='/*' element={<Home />} />
          <Route
            path='users'
            element={isAuthenticated ? <UsersList /> : <Navigate to="/login" replace />}
          />
          <Route
            path='posts'
            element={isAuthenticated ? <PostList /> : <Navigate to="/login" replace />}
          />
          <Route
            path='create-post'
            element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" replace />}
          />
          <Route
            path='/post-detail/:postId'
            element={isAuthenticated ? <PostDetail /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App;
