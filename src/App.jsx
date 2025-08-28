import { useState, useReducer, useRef, createContext, useEffect } from "react";
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

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    //이거 추가
    case "INIT": {
      nextState = action.data;
      break;
    }
    //
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default: {
      nextState = state;
      break;
    }
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [state, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  // 일기 추가, New 페이지에서 호출

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      console.log("저장된 데이터가 없습니다.");
      setIsDataLoaded(false);
      return;
    }
    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      setIsDataLoaded(false);
      console.log("저장된 데이터가 배열이 아닙니다.");
      return;
    }

    // ID 충돌 방지를 위해 최대 ID 값 찾기
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsDataLoaded(false);
  }, []);

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

  if (isDataLoaded) {
    return <div>Loading...</div>;
  }

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
