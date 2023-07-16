import React, { useEffect, useState, useRef } from "react";
import Sound from './SondLoti'
const DragAndDrop = ({ theDataanswers }) => {
  const [idOnDrag, setIdOnDrag] = useState();
  const [idAnswer, setIdAnswer] = useState(-1);
  const [itemQuastion, setItemQuastion] = useState();
  const [it, setIt] = useState(0);
  const [itq, setItq] = useState(-1);
  const [overItem, setOverItem] = useState(0)
  const [cursor, setcursor] = useState(true)
  const [number , setNumber]=useState()
  const draggableRef1 = useRef([]);
  const [x, setx] = useState()
  const [y, sety] = useState()
  const [mama, setMama] = useState();
  const [merhabalar, setMerhabalar] = useState(true);
  const filteredDataAnwer = theDataanswers.filter((item) =>item.group.startsWith("b") );
  const filteredDataQuastion = theDataanswers.filter((item) => item.group.startsWith("a"));
  const [array, setArray] = useState(filteredDataAnwer);
  const [arraya, setArraya] = useState(filteredDataQuastion);
  const arr = filteredDataQuastion;
  const [chekcolor, setChekcolor] = useState(0)
  const [ onClickFlag ,setonClickFlag ]=useState(false)

  const [onclickcolor, setonclickcolor] = useState(true);
  const onclickall = () => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].text !== arr[i].text) {
        setonclickcolor(false);
      }
    }
  };


  const handelerhand = (e) => {
        setMerhabalar(false);
        setx(e.clientX);
        sety(e.clientY);
      }
  const handelerOnDragstart = (item, id) => {
    setIdOnDrag(id)
    setItemQuastion(item);
    setItq(id)
    setIt();
    setcursor(false)
  }
  const handleDragEnd = () => {
  setNumber()
  setIdOnDrag()
  setIdAnswer();
  setcursor(true)
  const newArray = array.map((item, id) => {
    if (it === id && item?.flag === undefined && !item?.flag) {

      setOverItem(overItem +1);
      return { ...item, text: itemQuastion.text, flag: true };
    }
      return { ...item };
    });
    setArray(newArray);
  }
  const overDrag = (item,id) => {
    setIt(id);
    setIdAnswer(id);
  !itemQuastion.unclick && setIdAnswer(id);
  }
  useEffect(() => {
    const newArraya = arraya.map((item, id) => {
      if (itq === id) {
                      setChekcolor(chekcolor +1);

        return { ...item, unclick: true };
      }
      return { ...item };
    });
    setArraya(newArraya);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overItem]);
  const onClickAnswers = (itemx,idx) => {
    const newArray = array.map((item, id) => {
      if (idx === id && item?.flag !== undefined) {
              setChekcolor(chekcolor -1);

        return { ...item, text: "", flag: undefined };
      }
      return { ...item };
    });
    const newArraya = arraya.map((item, id) => {
      if (itemx.text === item.text) {
        setOverItem(id+1);
        return { ...item, unclick: false };
      }
      return { ...item };
    });
    setArraya(newArraya);
    setItq();
    setArray(newArray);
  }
  const touchstart = (id) => {
    const newArray = array.map((item, id) => {
      if (number === id && item?.flag === undefined && !item?.flag) {
        setOverItem(overItem + 1);
        return { ...item, text: itemQuastion.text, flag: true };
      }
      return { ...item };
    });
      setArray(newArray);
  }
  const handleTouchMove = (event) => {
    if (!arraya[itq].unclick) {
      setMerhabalar(false);
      const touch = event.touches[0];
      const x = touch.clientX;
    const y = touch.clientY;
    setx(x);
    sety(y);
    const { left, top, width, height } = draggableRef1.current.getBoundingClientRect()
    for (let i = 0; i < array.length; i++) {
      if (
        x >= left &&
        x <= left + width &&
        y >= top-(i*100) &&
        y <= top -(i*100) + height
        ) { setNumber(array.length - 1 - i); }
      }
    }
  }

const [flagSound,setFlagSound]=useState(true)
const [numberSound,setNumberSound]=useState()
      const audioRef = useRef(null);
      const playSound = (ids) => {
          audioRef.current.src = array[ids].sound;
        audioRef.current.play();
        setFlagSound(false)
        setNumberSound(ids)
      
  };
      useEffect(() => {
        const shuffledItems = [...arraya];
        shuffledItems.sort(() => Math.random() - 0.5);
        setArraya(shuffledItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  

  return (
    <div className="containere overflow">
      <audio
        ref={audioRef}
        type="audio/mpeg"
        onEnded={() => {setFlagSound(true)}}
        onPlay={() => {}}
      >
        <source />
      </audio>
      <h2 className=" text-center my-5">{theDataanswers.questionText} </h2>
      <div className="row w-100">
        <div className="col-md-6 col-12">
          <div className="row">
            {array.map((item, id) => {
              return (
                <div className="col-12" key={id}>
                  <div className="row ">
                    <div
                      ref={draggableRef1}
                      className={`col-8   text-center border border-warning shadow  rounded answers
                      ${!item.flag ? "boxs" : ""}
                      ${(id === idAnswer || id === number) && "draggingg"} 
                    ${
                      onClickFlag &&
                      ` ${arr[id].text === item.text ? "true" : "fals"}`
                    }
                      `}
                      id={id}
                      onDragOver={() => {
                        overDrag(item, id);
                      }}
                      onClick={() => {
                        !onClickFlag && onClickAnswers(item, id);
                      }}
                    >
                      {item.text}
                    </div>
                    <div className="col-3 position-relative">
                      {(flagSound || numberSound!==id) ? (
                        <img
                          draggable={"false"}
                          className=" position-absolute top-50 start-50 translate-middle position-absolute"
                          src="/img/64px.svg"
                          alt="sond"
                          onClick={() => {
                            playSound(id);
                          }}
                        />
                      ) : (
                        <Sound />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row">
            {arraya.map((item, id) => {
              return (
                <div className="col-12  " id={id} key={id}>
                  {item.group === "a" && (
                    <div
                      draggable={!item.unclick && "true"}
                      onTouchMove={handleTouchMove}
                      onTouchStart={() => {
                        !item.unclick && setIdOnDrag(id);
                        setNumber();
                        setItemQuastion(item);
                        !item.unclick && setItq(id);
                        !item.unclick && setMama(item.text);
                      }}
                      onTouchEnd={() => {
                        setNumber();
                        setMerhabalar(true);
                        !item.unclick && touchstart();
                        setIdOnDrag();
                      }}
                      onDragStart={() => {
                        setMama(item.text);
                        setItemQuastion(item);
                        !item.unclick && handelerOnDragstart(item, id);
                      }}
                      onDragEnd={() => {
                        setMerhabalar(true);
                        !item.unclick && handleDragEnd();
                      }}
                      onDrag={handelerhand}
                      className={` text-center border  rounded answers shadow ${
                        id === idOnDrag && "dragging"
                      } ${item.unclick ? "onover" : ""}
                        ${cursor ? "mousstil" : "mouss"}
                         `}
                    >
                      {item.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`text-center border border-warning  rounded answers shadow w-25 ${
            merhabalar ? "with" : "wth"
          }`}
          style={{
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
          }}
        >
          {mama}
        </div>

        <div className="d-flex justify-content-center">
          {chekcolor !== array.length ? (
            <button className={`w-50   border border-warning rounded p-3`}>
              chek
            </button>
          ) : (
            <button
              onClick={() => {
                setonClickFlag(true);
                  onclickall();
                  console.log (array)
                  console.log (arraya)
              }}
              className={`w-50   border border-warning btn btn-warning rounded p-3 ${
                onClickFlag && `${onclickcolor ? "baktrue" : "bakfalse"}`
              }`}
            >
              chek
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DragAndDrop;
