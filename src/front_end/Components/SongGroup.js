import React from "react";
import { Box, Collage, Image, Mask, IconButton, Heading } from "gestalt";

const styles = {
  nowPlaying: { textShadow: "rgb(0, 0, 0) 0px 0px 20px", margin: 10 },
  playButton: { position: "absolute", bottom: -140, right: 10 }
};

export default props => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      flex="grow"
      shape="rounded"
      paddingY={5}
    >
      <Collage
        columns={2}
        height={300}
        width={300}
        key={JSON.stringify(props.songs)}
        renderImage={({ index, width, height }) => {
          const { songs } = props;
          if (songs[index]) {
            const image = songs[index].Image;

            return (
              <Mask
                wash
                width={width - 10}
                height={height - 10}
                shape="rounded"
                key={image}
              >
                <Image
                  alt="collage image"
                  color={"#eee"}
                  fit="cover"
                  src={image}
                  key={image}
                >
                  {index == 0 && (
                    <h4
                      className="lH1 dyH iFc SMy ut5 erh IZT"
                      style={styles.nowPlaying}
                    >
                      {props.label}
                    </h4>
                  )}
                </Image>
              </Mask>
            );
          }

          return <div/>
        }}
      />
      <div style={{ position: "relative" }}>
        <div style={styles.playButton}>
          <IconButton
            accessibilityLabel="Go to now playing"
            bgColor="white"
            icon="play"
            iconColor="darkGray"
            onClick={props.onClick}
          />
        </div>
      </div>
    </Box>
  );
};
