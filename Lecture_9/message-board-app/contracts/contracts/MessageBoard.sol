// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title MessageBoard
 * @dev Simple message board contract for Base blockchain
 */
contract MessageBoard {
    struct Message {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;
    uint256 public messageCount;

    event MessagePosted(
        uint256 indexed id,
        address indexed author,
        string content,
        uint256 timestamp
    );

    /**
     * @dev Post a new message
     * @param _content The message content
     */
    function postMessage(string memory _content) public {
        require(bytes(_content).length > 0, "Message cannot be empty");
        require(bytes(_content).length <= 280, "Message too long");

        uint256 newId = messageCount;
        messages.push(
            Message({
                id: newId,
                author: msg.sender,
                content: _content,
                timestamp: block.timestamp
            })
        );

        messageCount++;

        emit MessagePosted(newId, msg.sender, _content, block.timestamp);
    }

    /**
     * @dev Get a specific message
     * @param _id The message ID
     */
    function getMessage(
        uint256 _id
    )
        public
        view
        returns (
            uint256 id,
            address author,
            string memory content,
            uint256 timestamp
        )
    {
        require(_id < messageCount, "Message does not exist");
        Message memory message = messages[_id];
        return (message.id, message.author, message.content, message.timestamp);
    }

    /**
     * @dev Get recent messages
     * @param _count Number of recent messages to return
     */
    function getRecentMessages(
        uint256 _count
    ) public view returns (Message[] memory) {
        uint256 count = _count > messageCount ? messageCount : _count;
        Message[] memory recentMessages = new Message[](count);

        for (uint256 i = 0; i < count; i++) {
            recentMessages[i] = messages[messageCount - 1 - i];
        }

        return recentMessages;
    }

    /**
     * @dev Get total number of messages
     */
    function getMessageCount() public view returns (uint256) {
        return messageCount;
    }
}
