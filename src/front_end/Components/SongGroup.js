import React from "react";
import { Box, Collage, Image, Mask, IconButton, Heading } from "gestalt";

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
        renderImage={({ index, width, height }) => {
          const { songs } = props;
          const image = songs[index].Image;

          return (
            <Mask wash width={width - 10} height={height - 10} shape="rounded">
              <Image
                alt="collage image"
                color={"#eee"}
                fit="cover"
                naturalHeight={image.height}
                naturalWidth={image.width}
                src={image.url}
              >
                {index == 0 && (
                  <h4
                    className="lH1 dyH iFc SMy ut5 erh IZT"
                    style={{ textShadow: "rgb(0, 0, 0) 0px 0px 20px", margin: 10 }}
                  >
                    {props.label}
                  </h4>
                )}
              </Image>
            </Mask>
          );
        }}
      />
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", bottom: -140, right: 10 }}>
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
