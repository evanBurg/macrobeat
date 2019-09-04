import React from "react";
import { Heading, Avatar, Box } from "gestalt";
import { AppContext } from "../app";
import Loader from "react-loaders";

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
  return <div style={{ ...styles.row, ...props.style }}>{props.children}</div>;
};

const Page = props => {
  return (
    <AppContext.Consumer>
      {context => (
        <div style={{ ...styles.container, ...props.style }}>
          <Row>
            <Box
              display="flex"
              flex="grow"
              justifyContent="between"
              paddingY={5}
              paddingX={6}
            >
              <Heading size="sm">{props.heading}</Heading>
              {context.loading ? (
                <Loader type="semi-circle-spin" color="black" />
              ) : (
                <Avatar
                  size="md"
                  name="User"
                  src={context.user.img || "https://via.placeholder.com/150"}
                />
              )}
            </Box>
          </Row>
          {props.children}
        </div>
      )}
    </AppContext.Consumer>
  );
};

export { Row, Page };

export default Page;
