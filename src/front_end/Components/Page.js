import React from "react";
import { Heading, Avatar, Box } from "gestalt";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    paddingBottom: 50
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    verticalAlign: "middle",
    alignItems: "center"
  }
};

const Row = props => {
  return <div style={{ ...props.style, ...styles.row }}>{props.children}</div>;
};

const Page = props => {
  return (
    <div style={{ ...props.style, ...styles.container }}>
      <Row>
        <Box
          display="flex"
          flex="grow"
          justifyContent="between"
          paddingY={5}
          paddingX={6}
        >
          <Heading size="sm">{props.heading}</Heading>
          <Avatar size="md" name="User" src="https://via.placeholder.com/150" />
        </Box>
      </Row>
      {props.children}
    </div>
  );
};

export {Row, Page};

export default Page;
