import React, { useEffect, useRef, useState } from "react";
import { View, PanResponder } from "react-native";
import Svg, { Path } from "react-native-svg";
import styles from "./styles/whiteBoard.style";
import { socket } from "../utils/config";

const WhiteBoard = ({
  color,
  size,
  isUndo,
  onUndo,
  isRedo,
  onRedo,
  isClear,
  onClearDrawing,
  enableDrawing,
}) => {
  const [paths, setPaths] = useState([]);
  const [pathToDisplay, setPathToDisplay] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const colorRef = useRef("");
  const sizeRef = useRef(0);
  //   const [redoStack, setRedoStack] = useState([]);

  const path = useRef("");
  const count = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        path.current = `${gesture.x0},${gesture.y0 - 60} `;
        count.current = 0;
      },
      onPanResponderEnd: () => {
        setPathToDisplay([]);

        setPaths((previousPaths) => [
          ...previousPaths,
          {
            path: path.current,
            color: colorRef.current,
            size: sizeRef.current,
          },
        ]);
        // Emit draw event to server
        socket.emit("draw", {
          path: path.current,
          color: colorRef.current,
          size: sizeRef.current,
        });
      },
      onPanResponderMove: (event, gesture) => {
        //-60 để vị trí người dùng chạm vào trùng với vị trí của mà màn hình bị trừ xuống
        path.current += `${gesture.moveX},${gesture.moveY - 60} `;
        count.current += 1;

        if (count.current === 1) {
          setPathToDisplay([]);
          count.current = 0;
        }

        setPathToDisplay((previousPaths) => [
          ...previousPaths,
          {
            path: path.current,
            color: colorRef.current,
            size: sizeRef.current,
          },
        ]);
      },
    })
  ).current;

  useEffect(() => {
    colorRef.current = color;
    sizeRef.current = size / 1.25;
  }, [color, size]);

  useEffect(() => {
    // Join the room when component mounts

    // Listen for draw event from server
    socket.on("draw", (newPath) => {
      if (newPath.length === 0) {
        setPaths([]);
        setUndoStack([]);
        return;
      } else if (newPath === "undo") {
        setPaths((prevPaths) => {
          if (prevPaths.length === 0) return prevPaths;
          setUndoStack((prevUndoStack) => [
            prevPaths[prevPaths.length - 1],
            ...prevUndoStack,
          ]);
          return prevPaths.slice(0, -1);
        });
      } else if (newPath === "redo") {
        setUndoStack((prevUndoStack) => {
          if (prevUndoStack.length === 0) return prevUndoStack;
          setPaths((prevPaths) => [...prevPaths, prevUndoStack[0]]);
          return prevUndoStack.slice(1);
        });
      } else {
        setPaths((prevPaths) => [...prevPaths, newPath]);
      }
    });
  }, []);

  useEffect(() => {
    if (isUndo) {
      undo();
      onUndo();

      socket.emit("draw", "undo");
    }

    if (isRedo) {
      redo();
      onRedo();

      socket.emit("draw", "redo");
    }

    if (isClear) {
      setPaths([]);
      setUndoStack([]);
      onClearDrawing();
      socket.emit("draw", []);
    }
  }, [isRedo, isUndo, color, isClear]);

  const undo = () => {
    if (paths.length === 0) return;
    const lastPath = paths[paths.length - 1];
    setUndoStack((prevUndoStack) => [lastPath, ...prevUndoStack]);
    setPaths(paths.slice(0, -1));
  };

  const redo = () => {
    if (undoStack.length === 0) return;
    const lastUndo = undoStack[0];
    setPaths((prevPaths) => [...prevPaths, lastUndo]);
    setUndoStack(undoStack.slice(1));
  };

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        {pathToDisplay.length !== 0 &&
          pathToDisplay.map((p, index) => (
            <Path
              key={index}
              d={`M${p.path}`}
              stroke={p.color}
              strokeWidth={p.size}
              fill="none"
            />
          ))}
        {paths.length !== 0 &&
          paths.map((p, index) => (
            <Path
              key={index}
              d={`M${p.path}`}
              stroke={p.color}
              strokeWidth={p.size}
              fill="none"
            />
          ))}
      </Svg>
      {enableDrawing && (
        <View style={styles.touchArea} {...panResponder.panHandlers} />
      )}
    </View>
  );
};

export default WhiteBoard;
