import React from 'react';
import {Box, Collage, Image, Mask, IconButton, Heading} from 'gestalt';

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
              columns={3}
              height={300}
              width={300}
              renderImage={({ index, width, height }) => {
                const {images} = props;
                const image = images[index];
                return (
                  <Mask wash width={width} height={height}>
                    <Image
                      alt="collage image"
                      color={image.color}
                      fit="cover"
                      naturalHeight={image.naturalHeight}
                      naturalWidth={image.naturalWidth}
                      src={image.src}
                    />
                  </Mask>
                );
              }}
            />
            <div style={{ position: "relative" }}>
              <div style={{position: 'absolute', bottom: -140, right: 10}}>
                <IconButton
                  accessibilityLabel="Go to now playing"
                  bgColor="white"
                  icon="play"
                  iconColor="darkGray"
                  onClick={props.onClick}
                />
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{position: 'absolute', top: -150, right: props.textRight || 170}}>
                <h4 className="lH1 dyH iFc SMy ut5 erh IZT" style={{textShadow: 'rgb(0, 0, 0) 0px 0px 20px'}}>
                    {props.label}
                </h4>
              </div>
            </div>
          </Box>
    )
}