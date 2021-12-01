import { useEffect, useState } from "react";
import "./styles.css";
import useSound from "use-sound";
import Sound from "../public/メジャーリーグファンファーレ.mp3";

type Info = {
  id: string;
  status: boolean;
  value: string;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [play] = useSound(Sound, { playbackRate: 1 });
  // const [task, setTask] = useState({});
  const [task, setTask] = useState([]);
  const [task1, setTask1] = useState([]);
  const [task2, setTask2] = useState([]);
  const [task3, setTask3] = useState([]);
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState("");
  const [completedTask, setCompletedTask] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  useEffect(() => {
    if (completedTask.length > 2 && completedTask.length < 4) {
      play();
    }
    if (completedTask.length > 5 && completedTask.length < 7) {
      play();
    }
  }, [completedTask]);

  const onCountUp = () => {
    setCount(count + 1);
  };

  const onValueChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onTaskAdd = (e: any) => {
    e.preventDefault();
    const tempTask = [...task, { id: Date.now(), status: false, value: value }];

    setTask(tempTask);
  };

  const onTaskCompleted = (index) => {
    const res = task.filter((data) => {
      return data.status === true;
    });
    const res1 = task.filter((data) => {
      return data.status === false;
    });
    setTask(res1);
    setCompletedTask([...completedTask, ...res]);
    // setCompleteTask([...completedTask, {status: false, value: }])
  };

  const onChange = (e, data, index) => {
    const tempTask = [...task];
    tempTask[index].status = true;
    setTask(tempTask);
  };

  return (
    <div className="App">
      <button onClick={onCountUp}>カウントアップ</button>
      <p>{completedTask.length}</p>
      {completedTask.length < 3 ? (
        <img src="../男性.png" alt="写真" width="300" height="200" />
      ) : completedTask.length > 3 && completedTask.length < 5 ? (
        <img src="../夫婦.png" alt="写真" width="300" height="200" />
      ) : completedTask.length > 5 ? (
        <img src="../親子.png" alt="写真" width="300" height="200" />
      ) : (
        <img src="../夫婦.png" alt="写真" width="300" height="200" />
      )}

      <form>
        <input onChange={onValueChange} value={value}></input>
        <button onClick={onTaskAdd}>追加する</button>
      </form>
      <h5>未完了</h5>
      {task.map((data, index) => (
        <div>
          <input
            checked={data.status}
            onChange={(e) => onChange(e, data, index)}
            type="checkbox"
          ></input>
          {data.value}
        </div>
      ))}
      <button onClick={onTaskCompleted}>完了ボタン</button>
      <h5>完了</h5>
      {completedTask.map((data) => (
        <ul>
          <li>{data.value}</li>
        </ul>
      ))}
    </div>
  );
}
