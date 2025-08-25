import { useState, useReducer, useRef, createContext } from "react";
import "./App.css";
import Home from "./Pages/Home";
import New from "./Pages/New";
import Diary from "./Pages/Diary";
import Edit from "./Pages/Edit";
import NotFound from "./Pages/NotFound";

import Button from "./components/Button";
import Header from "./components/Header";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { getEmotionImage } from "./util/get-emotion-image";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

const mockData = [
  // 임시 데이터
  {
    id: 1,
    createdDate: new Date("2025-08-26").getTime(),
    emotionId: 1,
    content: "1번 일기",
  },
  {
    id: 2,
    createdDate: new Date("2025-08-25").getTime(),
    emotionId: 2,
    content: "2번 일기",
  },
  {
    id: 3,
    createdDate: new Date("2025-07-24").getTime(),
    emotionId: 3,
    content: "3번 일기",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    }
    case "DELETE": {
      return state.filter((item) => String(item.id) !== String(action.id));
    }
    default: {
      return state;
    }
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3); // 겹치면 안됨

  // 일기 추가, New 페이지에서 호출
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      // action 객체
      type: "CREATE",
      data: { id: idRef.current++, createdDate, emotionId, content },
    });
  };

  // 일기 수정, Edit 페이지에서 호출
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: { id: id, createdDate, emotionId, content },
    });
  };

  // 일기 삭제, Diary 페이지에서 호출
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    // 경로가 일치하는 컴포넌트를 페이지로써 렌더링
    <DiaryStateContext.Provider value={state}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <Routes>
          <Route path="/" element={<Home />} /> // element: 렌더링할 컴포넌트
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
