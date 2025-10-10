import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MessageBoardModule = buildModule("MessageBoardModule", (m) => {
  // Deploy MessageBoard contract
  const messageBoard = m.contract("MessageBoard");

  return { messageBoard };
});

export default MessageBoardModule;
