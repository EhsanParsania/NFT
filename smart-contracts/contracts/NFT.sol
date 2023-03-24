// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";

contract NFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    mapping(uint256 => Attr) private _tokenURIs;

    struct Attr {
        string name;
        string url;
    }


    constructor() ERC721("parse", "PARSE") {}

    function mintNFT(address recipient, string memory url) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        setTokenMetadata(newItemId, "my nft", url);
        return newItemId;
    }

    function setTokenMetadata(
        uint256 tokenId,
        string memory name,
        string memory url
    ) internal {
        _tokenURIs[tokenId] = Attr(name, url);
    }


    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        _tokenURIs[tokenId].name,
                        '",',
                        '"image_data": "',
                        _tokenURIs[tokenId].url,
                        '",',
                        '"attributes": [{"trait_type": "Speed", "value": ',
                        "5",
                        "},",
                        '{"trait_type": "Attack", "value": ',
                        "2",
                        "},",
                        '{"trait_type": "Defence", "value": ',
                        "3",
                        "},",
                        '{"trait_type": "Material", "value": "',
                        "4",
                        '"}',
                        "]}"
                    )
                )
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", json));
    }
}