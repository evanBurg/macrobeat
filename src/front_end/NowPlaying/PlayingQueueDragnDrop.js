import React, { useState } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { Song } from "../Components/CollectionView";
import Text from "../Components/WrapperComponents";
import MdRepeat from "react-ionicons/lib/MdRepeat";
import MdShuffle from "react-ionicons/lib/MdShuffle";
import IosArrowDown from "react-ionicons/lib/IosArrowDown";
import { AppContext } from "../app";
import { motion } from "framer-motion";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const styles = {
  container: {
    zIndex: 29,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  innerContainer: {
    zIndex: 29,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "60vh"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    background: "#efefef",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 4,
    paddingBottom: 4
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  headerText: {
    fontSize: "1.6em",
    fontWeight: "500",
    padding: "1.3rem"
  },
  headerIcon: {
    padding: "1.3rem"
  },
  songWrapper: {
    width: "100%",
    padding: 4
  }
};

const container = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren"
    }
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren"
    }
  }
};

const inner = {
  hidden: {
    y: 500
  },
  visible: {
    y: 0
  }
};

const Playing = (ctx, song) => {
  const curSong = ctx.Queue.CurrentSong;
  return curSong.ID === song.ID && curSong.Time === song.Time;
};

const Row = React.memo(({ data: songs, index, style }) => {
  const song = songs[index];
  return (
    <AppContext.Consumer key={`${song.ID}-${song.Time}`}>
      {ctx => (
        <Draggable
          draggableId={`${song.ID}-${song.Time}`}
          index={index}
          style={style}
          key={`${song.ID}-${song.Time}`}
        >
          {(provided, snapshot) => (
            <div
              style={{ margin: 0, ...style }}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Song
                song={song}
                playing={Playing(ctx, song)}
                index={index}
                type="queue"
                isDragging={snapshot.isDragging}
                isGroupedOver={Boolean(snapshot.combineTargetFor)}
              />
            </div>
          )}
        </Draggable>
      )}
    </AppContext.Consumer>
  );
}, areEqual);

function App(props) {
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.source.index === result.destination.index) {
      return;
    }

    const newSongs = reorder(
      props.queue.Array,
      result.source.index,
      result.destination.index
    );
    props.reorderQueue(newSongs);
  }

  return (
    <motion.div
      onClick={props.close}
      style={styles.container}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        style={styles.innerContainer}
        variants={inner}
        onClick={e => e.stopPropagation()}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{
          damping: 20
        }}
      >
        <div style={styles.headerContainer} onClick={props.close}>
          <Text style={styles.headerText}>Up Next</Text>
          <div style={styles.headerIcons}>
            <div style={styles.headerIcon}>
              <MdRepeat fontSize="1.7em" color="black" />
            </div>
            <div style={styles.headerIcon}>
              <MdShuffle fontSize="1.7em" color="black" />
            </div>
            <div style={styles.headerIcon}>
              <IosArrowDown fontSize="1.7em" color="black" />
            </div>
          </div>
        </div>
        <div style={styles.songsContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="droppable"
              mode="list"
              renderClone={(provided, snapshot, rubric) => (
                <AppContext.Consumer>
                  {ctx => (
                    <div
                      style={styles.songWrapper}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Song
                        song={songs[rubric.source.index]}
                        style={{ margin: 0 }}
                        type="queue"
                        isDragging={snapshot.isDragging}
                        index={rubric.source.index}
                        playing={Playing(ctx, songs[rubric.source.index])}
                      />
                    </div>
                  )}
                </AppContext.Consumer>
              )}
            >
              {droppableProvided => (
                <AppContext.Consumer>
                  {ctx => (
                    <React.Fragment>
                      {ctx.Queue.Array ? (
                        <div 
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        style={{width: '100%', height: '50vh', overflowX: 'hidden', overflowY: 'auto'}}
                        >
                          {ctx.Queue.Array.map((song, idx) => {
                            return <Row
                              data={ctx.Queue.Array}
                              index={idx}
                            />
                          })}
                        </div>
                      ) : (
                        <React.Fragment />
                      )}
                      {droppableProvided.placeholder}
                    </React.Fragment>
                  )}
                </AppContext.Consumer>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
