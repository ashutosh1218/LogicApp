import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Symbols from "./Symbols";
import Numbers from './Numbers';
import { useDrop } from "react-dnd";

function App() {
  const [nums, setNumbers] = useState([])
  useEffect(() => {
    fetch('/contents').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setNumbers(jsonRes));
  })


  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addDivToBoard(item.id, item.type),
    // drop: (item) => console.log(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // console.log(nums)
  const addDivToBoard = (item, type) => {
    console.log(item, type)
    if (type === 'num') {
      // const numList = nums.filter((numb) => numb.key === item);
      const numList = Numbers.filter((numb) => numb.key === item);
      setBoard((board) => [...board, numList[0]]);
    }
    else if (type === 'sym') {

      const symbols = Symbols.filter((num) => num.key === item);
      setBoard((board) => [...board, symbols[0]]);
    }
  };

  function inputInt() {
    let text = prompt("Enter a number")
    console.log(text)
    const obj = {
      key: 20,
      num: text
    }
    if(text) setBoard((board) => [...board, obj])

  }
  const [res, setRes] = useState([])
  function calculate(e) {
    // console.log(board)
    e.preventDefault()
    // console.log(alert("Submitted"))
    function run() {
      setRes(() => {
        return board
      })
    }
    run()
    const num1 = parseInt(res[0].num);
    const num2 = parseInt(res[2].num);
    const op = res[1].num;
    const rhs = parseInt(res[4].num);
    const comp=res[3].num;
    let result = 0;
    if (op === "+") {
      result = num1 + num2;
    }
    else if (op === "-") {
      result = num1 - num2;
    }
    else if (op === "*") {
      result = num1 * num2;
    }
    else {
      result = num1 / num2;
    }
    if (comp === ">") {
      if (result > rhs)
        alert("true")
      else alert("false")
    }
    else {
      if (result < rhs)
        alert("true")
      else alert("false")
    }

  }
  function deleteItem(id, type) {
    setBoard((prevItems) => {
      return prevItems.filter(
        (item, index) => {
          return item.key !== id;
        }
      )
    }
    )
  }
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(70);
  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 5);
      if (seconds === 0) {
        console.log('1')
        setIsActive(false)
        setSeconds(70)
      }
    }
    return () => {
      clearInterval(timer);
    };
  }, [isActive, seconds]);
  function addCard(id, type) {
    if (!isActive) {
      console.log('2')
      setIsActive(true)
    }
    else {
      if (seconds < 70) {
        console.log('10')
        const symbols = Symbols.filter((num) => num.key === id);
      setBoard((board) => [...board, symbols[0]]);

      }
    }
  }

  return (
    <div className="App">
      <div className="Box number">
        {Numbers.map((number) =>
          <Card
            key={number.key}
            id={number.key}
            name="card"
            num={number.num}
            drag={true}
            type={number.type}
            display={false}
            addDiv={addCard}
          />
        )}
      </div>
      <div className="Box oper">
        {Symbols.map((item, index) =>
          <Card
            key={item.key}
            // key={index}
            id={item.key}
            name={item.name}
            num={item.num}
            drag={item.drag}
            type={item.type}
            display={false}
            addDiv={addCard}
          />
        )}
        <div
          className='card Board'
          onClick={inputInt}
        >
          <p>RHS Integer</p>
        </div>
      </div>
      {/* Result Div */}
      <div className="Box result" ref={drop}>

        {board.map((number) => {
          {/* console.log(number) */ }
          return <Card
            key={number.key}
            id={number.key}
            name="card"
            num={number.num}
            // drag={false}
            onCheck={deleteItem}
            type={number.type}
            display={true}
            addDiv={addCard}
          />;
        })}
      </div>
      <form action="">
        <button className='evaluate-btn' type='submit' onClick={calculate}>Evaluate</button>
      </form>
    </div>
  );
}

export default App;
